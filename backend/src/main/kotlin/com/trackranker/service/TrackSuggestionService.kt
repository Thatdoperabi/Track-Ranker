package com.trackranker.service

import com.trackranker.model.TrackSuggestion
import com.trackranker.model.SuggestionStatus
import com.trackranker.repository.TrackSuggestionRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime

@Service
@Transactional
class TrackSuggestionService(
    private val trackSuggestionRepository: TrackSuggestionRepository
) {
    
    fun getAllSuggestions(): List<TrackSuggestion> = trackSuggestionRepository.findAll()
    
    fun getSuggestionsByStatus(status: SuggestionStatus): List<TrackSuggestion> {
        return trackSuggestionRepository.findByStatus(status)
    }
    
    fun createSuggestion(suggestion: TrackSuggestion): TrackSuggestion {
        val newSuggestion = suggestion.copy(
            suggestionDate = LocalDateTime.now(),
            status = SuggestionStatus.PENDING
        )
        return trackSuggestionRepository.save(newSuggestion)
    }
    
    fun updateSuggestionStatus(suggestionId: Long, status: SuggestionStatus): TrackSuggestion? {
        val suggestion = trackSuggestionRepository.findById(suggestionId).orElse(null) ?: return null
        
        val updatedSuggestion = suggestion.copy(status = status)
        return trackSuggestionRepository.save(updatedSuggestion)
    }
    
    fun deleteSuggestion(suggestionId: Long): Boolean {
        return if (trackSuggestionRepository.existsById(suggestionId)) {
            trackSuggestionRepository.deleteById(suggestionId)
            true
        } else {
            false
        }
    }
} 