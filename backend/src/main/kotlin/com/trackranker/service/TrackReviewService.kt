package com.trackranker.service

import com.trackranker.model.TrackReview
import com.trackranker.repository.TrackReviewRepository
import com.trackranker.repository.TrackRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Service
@Transactional
class TrackReviewService(
    private val trackReviewRepository: TrackReviewRepository,
    private val trackRepository: TrackRepository
) {
    
    fun getReviewsByTrackId(trackId: Long): List<TrackReview> {
        return trackReviewRepository.findByTrackIdOrderByReviewDateDesc(trackId)
    }
    
    // NEW: Optimized method to get all reviews for multiple tracks in one query
    fun getAllReviewsForTracks(trackIds: List<Long>): List<TrackReview> {
        return trackReviewRepository.findAllByTrackIdIn(trackIds)
    }
    
    fun createReview(trackId: Long, review: TrackReview): TrackReview? {
        // Verify track exists
        if (!trackRepository.existsById(trackId)) {
            return null
        }
        
        // Create a new review without ID to avoid conflicts
        val newReview = TrackReview(
            id = null, // Let the database generate the ID
            trackId = trackId,
            userDifficultyRating = review.userDifficultyRating,
            userReviewText = review.userReviewText,
            userName = review.userName,
            bikeModel = review.bikeModel, // Add this line!
            reviewDate = LocalDateTime.now()
        )
        
        val savedReview = trackReviewRepository.save(newReview)
        
        // Update track's average rating and review count
        updateTrackRatingStats(trackId)
        
        return savedReview
    }
    
    fun updateReview(reviewId: Long, review: TrackReview): TrackReview? {
        val existingReview = trackReviewRepository.findById(reviewId).orElse(null) ?: return null
        
        val updatedReview = existingReview.copy(
            userDifficultyRating = review.userDifficultyRating,
            userReviewText = review.userReviewText,
            userName = review.userName,
            bikeModel = review.bikeModel // Add this line!
        )
        
        val savedReview = trackReviewRepository.save(updatedReview)
        
        // Update track's average rating
        updateTrackRatingStats(existingReview.trackId)
        
        return savedReview
    }
    
    fun deleteReview(reviewId: Long): Boolean {
        val review = trackReviewRepository.findById(reviewId).orElse(null) ?: return false
        val trackId = review.trackId
        
        trackReviewRepository.deleteById(reviewId)
        
        // Update track's average rating and review count
        updateTrackRatingStats(trackId)
        
        return true
    }
    
    private fun updateTrackRatingStats(trackId: Long) {
        val track = trackRepository.findById(trackId).orElse(null) ?: return
        
        val userReviewsAverage = trackReviewRepository.getAverageRatingByTrackId(trackId)
        val userReviewCount = trackReviewRepository.getReviewCountByTrackId(trackId)
        
        // Calculate overall average including AI rating
        val aiRating = track.aiDifficultyRating?.toDouble() ?: 0.0
        val userRating = userReviewsAverage ?: 0.0
        
        val overallAverage = if (userReviewsAverage != null) {
            // Include AI rating in the average calculation
            (aiRating + userRating) / 2.0
        } else {
            // Only AI rating available
            aiRating
        }
        
        // Include AI review in the total count if AI rating exists
        val totalReviewCount = if (track.aiDifficultyRating != null) {
            userReviewCount + 1 // Add 1 for AI review
        } else {
            userReviewCount
        }
        
        val updatedTrack = track.copy(
            averageUserRating = overallAverage.toFloat(),
            numberOfReviews = totalReviewCount.toInt(),
            updatedAt = LocalDateTime.now()
        )
        
        trackRepository.save(updatedTrack)
    }
} 