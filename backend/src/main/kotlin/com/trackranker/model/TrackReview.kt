package com.trackranker.model

import com.fasterxml.jackson.annotation.JsonIgnore
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "track_reviews")
data class TrackReview(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    
    @Column(name = "track_id", nullable = false)
    val trackId: Long,
    
    @Column(name = "user_difficulty_rating", nullable = false)
    val userDifficultyRating: Int,
    
    @Column(name = "user_review_text", nullable = false, columnDefinition = "TEXT")
    val userReviewText: String,
    
    @Column(name = "review_date", nullable = false)
    val reviewDate: LocalDateTime = LocalDateTime.now(),
    
    @Column(name = "user_name")
    val userName: String? = null,
    
    @Column(name = "bike_model")
    val bikeModel: String? = null,
    
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "track_id", insertable = false, updatable = false)
    val track: Track? = null
) 