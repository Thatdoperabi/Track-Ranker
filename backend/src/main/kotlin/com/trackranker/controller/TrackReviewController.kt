package com.trackranker.controller

import com.trackranker.model.TrackReview
import com.trackranker.service.TrackReviewService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.slf4j.LoggerFactory

@RestController
@RequestMapping("/tracks")
class TrackReviewController(private val trackReviewService: TrackReviewService) {
    
    private val logger = LoggerFactory.getLogger(TrackReviewController::class.java)

    @GetMapping("/{trackId}/reviews")
    fun getReviewsByTrackId(@PathVariable trackId: Long): ResponseEntity<List<TrackReview>> {
        logger.info("Getting reviews for track ID: $trackId")
        val reviews = trackReviewService.getReviewsByTrackId(trackId)
        logger.info("Found ${reviews.size} reviews for track $trackId")
        return ResponseEntity.ok(reviews)
    }

    @PostMapping("/{trackId}/reviews")
    fun createReview(
        @PathVariable trackId: Long,
        @RequestBody review: TrackReview
    ): ResponseEntity<TrackReview> {
        logger.info("Creating review for track ID: $trackId")
        logger.info("Review data: userName=${review.userName}, rating=${review.userDifficultyRating}")
        
        val createdReview = trackReviewService.createReview(trackId, review)
        
        return if (createdReview != null) {
            logger.info("Successfully created review with ID: ${createdReview.id}")
            ResponseEntity.ok(createdReview)
        } else {
            logger.error("Failed to create review - track not found: $trackId")
            ResponseEntity.notFound().build()
        }
    }

    @PutMapping("/reviews/{reviewId}")
    fun updateReview(
        @PathVariable reviewId: Long,
        @RequestBody review: TrackReview
    ): ResponseEntity<TrackReview> {
        logger.info("Updating review ID: $reviewId")
        
        val updatedReview = trackReviewService.updateReview(reviewId, review)
        
        return if (updatedReview != null) {
            logger.info("Successfully updated review ID: $reviewId")
            ResponseEntity.ok(updatedReview)
        } else {
            logger.error("Failed to update review - not found: $reviewId")
            ResponseEntity.notFound().build()
        }
    }

    @DeleteMapping("/reviews/{reviewId}")
    fun deleteReview(@PathVariable reviewId: Long): ResponseEntity<Void> {
        logger.info("Deleting review ID: $reviewId")
        
        val deleted = trackReviewService.deleteReview(reviewId)
        
        return if (deleted) {
            logger.info("Successfully deleted review ID: $reviewId")
            ResponseEntity.ok().build()
        } else {
            logger.error("Failed to delete review - not found: $reviewId")
            ResponseEntity.notFound().build()
        }
    }
} 