package com.trackranker.controller

import com.trackranker.model.Track
import com.trackranker.repository.TrackRepository
import com.trackranker.service.TrackReviewService
import org.springframework.web.bind.annotation.*
import org.slf4j.LoggerFactory

@RestController
@RequestMapping("/tracks")
class TrackController(
    private val trackRepository: TrackRepository,
    private val trackReviewService: TrackReviewService
) {
    
    private val logger = LoggerFactory.getLogger(TrackController::class.java)

    @GetMapping
    fun getAllTracks(): List<Track> {
        logger.info("=== getAllTracks() called ===")
        val tracks = trackRepository.findAll()
        logger.info("Found ${tracks.size} tracks in database")
        
        // OPTIMIZED: Get all reviews for all tracks in one query instead of N+1 queries
        val trackIds = tracks.mapNotNull { it.id }
        val allReviews = trackReviewService.getAllReviewsForTracks(trackIds)
        
        // Group reviews by track ID for efficient lookup
        val reviewsByTrackId = allReviews.groupBy { it.trackId }
        
        // Calculate correct review counts for each track
        val tracksWithCorrectCounts = tracks.map { track ->
            val trackReviews = reviewsByTrackId[track.id] ?: emptyList()
            val userReviewCount = trackReviews.size
            val totalReviewCount = if (track.aiDifficultyRating != null) {
                userReviewCount + 1 // Add 1 for AI review
            } else {
                userReviewCount
            }
            
            track.copy(
                numberOfReviews = totalReviewCount,
                averageUserRating = calculateAverageRating(track, trackReviews)
            )
        }
        
        tracksWithCorrectCounts.forEach { track ->
            logger.info("Track: ${track.name} (${track.city}, ${track.state}) - Reviews: ${track.numberOfReviews}")
        }
        
        return tracksWithCorrectCounts
    }

    @GetMapping("/{id}")
    fun getTrackById(@PathVariable id: Long): Track? {
        logger.info("Getting track with id: $id")
        val track = trackRepository.findById(id).orElse(null) ?: return null
        
        // Calculate correct review count for this track
        val userReviewCount = trackReviewService.getReviewsByTrackId(id).size
        val totalReviewCount = if (track.aiDifficultyRating != null) {
            userReviewCount + 1 // Add 1 for AI review
        } else {
            userReviewCount
        }
        
        return track.copy(
            numberOfReviews = totalReviewCount,
            averageUserRating = calculateAverageRating(track, trackReviewService.getReviewsByTrackId(id))
        )
    }

    @GetMapping("/state/{state}")
    fun getTracksByState(@PathVariable state: String): List<Track> {
        logger.info("Getting tracks for state: $state")
        val tracks = trackRepository.findByState(state)
        
        // OPTIMIZED: Get all reviews for all tracks in one query
        val trackIds = tracks.mapNotNull { it.id }
        val allReviews = trackReviewService.getAllReviewsForTracks(trackIds)
        val reviewsByTrackId = allReviews.groupBy { it.trackId }
        
        // Calculate correct review counts for each track
        return tracks.map { track ->
            val trackReviews = reviewsByTrackId[track.id] ?: emptyList()
            val userReviewCount = trackReviews.size
            val totalReviewCount = if (track.aiDifficultyRating != null) {
                userReviewCount + 1 // Add 1 for AI review
            } else {
                userReviewCount
            }
            
            track.copy(
                numberOfReviews = totalReviewCount,
                averageUserRating = calculateAverageRating(track, trackReviews)
            )
        }
    }

    @GetMapping("/test")
    fun test(): String {
        logger.info("=== Test endpoint called ===")
        val count = trackRepository.count()
        logger.info("Total tracks in database: $count")
        return "Controller is working! Found $count tracks in database."
    }
    
    private fun calculateAverageRating(track: Track, userReviews: List<com.trackranker.model.TrackReview>): Float {
        val aiRating = track.aiDifficultyRating?.toDouble() ?: 0.0
        
        if (userReviews.isEmpty()) {
            return aiRating.toFloat()
        }
        
        // Calculate average of ALL reviews (user + AI) together
        val allRatings = userReviews.map { it.userDifficultyRating.toDouble() }.toMutableList()
        if (aiRating > 0) {
            allRatings.add(aiRating)
        }
        
        val totalAverage = allRatings.average()
        return totalAverage.toFloat()
    }
} 