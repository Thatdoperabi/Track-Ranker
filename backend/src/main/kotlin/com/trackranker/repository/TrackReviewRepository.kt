package com.trackranker.repository

import com.trackranker.model.TrackReview
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface TrackReviewRepository : JpaRepository<TrackReview, Long> {
    
    fun findByTrackIdOrderByReviewDateDesc(trackId: Long): List<TrackReview>
    
    @Query("SELECT AVG(r.userDifficultyRating) FROM TrackReview r WHERE r.trackId = :trackId")
    fun getAverageRatingByTrackId(@Param("trackId") trackId: Long): Double?
    
    @Query("SELECT COUNT(r) FROM TrackReview r WHERE r.trackId = :trackId")
    fun getReviewCountByTrackId(@Param("trackId") trackId: Long): Long
}