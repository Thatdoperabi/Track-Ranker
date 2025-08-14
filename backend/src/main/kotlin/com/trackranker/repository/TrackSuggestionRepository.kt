package com.trackranker.repository

import com.trackranker.model.TrackSuggestion
import com.trackranker.model.SuggestionStatus
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TrackSuggestionRepository : JpaRepository<TrackSuggestion, Long> {
    
    fun findByStatus(status: SuggestionStatus): List<TrackSuggestion>
} 