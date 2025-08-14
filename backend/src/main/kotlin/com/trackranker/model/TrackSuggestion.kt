package com.trackranker.model

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "track_suggestions")
data class TrackSuggestion(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    
    @Column(name = "track_name", nullable = false)
    val trackName: String,
    
    @Column(nullable = false)
    val location: String,
    
    @Column(name = "user_email", nullable = false)
    val userEmail: String,
    
    @Column(name = "suggestion_date", nullable = false)
    val suggestionDate: LocalDateTime = LocalDateTime.now(),
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    val status: SuggestionStatus = SuggestionStatus.PENDING
)

enum class SuggestionStatus {
    PENDING, APPROVED, REJECTED
} 