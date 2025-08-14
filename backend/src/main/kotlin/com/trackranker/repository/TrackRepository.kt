package com.trackranker.repository

import com.trackranker.model.Track
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository

@Repository
interface TrackRepository : JpaRepository<Track, Long> {
    
    fun findByState(state: String): List<Track>
    
    fun findByNameContainingIgnoreCaseOrCityContainingIgnoreCaseOrStateContainingIgnoreCase(
        name: String, city: String, state: String
    ): List<Track>
    
    @Query("SELECT t FROM Track t WHERE (t.aiDifficultyRating BETWEEN :minRating AND :maxRating) OR (t.averageUserRating BETWEEN :minRating AND :maxRating)")
    fun findByDifficultyRange(@Param("minRating") minRating: Int, @Param("maxRating") maxRating: Int): List<Track>
}
