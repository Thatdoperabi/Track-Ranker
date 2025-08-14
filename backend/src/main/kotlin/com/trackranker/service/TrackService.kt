package com.trackranker.service

import com.trackranker.model.Track
import com.trackranker.repository.TrackRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class TrackService(
    private val trackRepository: TrackRepository
) {
    
    fun getAllTracks(): List<Track> = trackRepository.findAll()
    
    fun getTrackById(id: Long): Track? = trackRepository.findById(id).orElse(null)
    
    fun getTracksByState(state: String): List<Track> = trackRepository.findByState(state)
    
    fun searchTracks(query: String): List<Track> {
        return trackRepository.findByNameContainingIgnoreCaseOrCityContainingIgnoreCaseOrStateContainingIgnoreCase(
            query, query, query
        )
    }
    
    fun getTracksByDifficultyRange(minRating: Int, maxRating: Int): List<Track> {
        return trackRepository.findByDifficultyRange(minRating, maxRating)
    }
    
    fun createTrack(track: Track): Track = trackRepository.save(track)
    
    fun updateTrack(id: Long, track: Track): Track? {
        val existingTrack = trackRepository.findById(id).orElse(null) ?: return null
        val updatedTrack = existingTrack.copy(
            name = track.name,
            city = track.city,
            state = track.state,
            zipCode = track.zipCode,
            trackLength = track.trackLength,
            trackWidth = track.trackWidth,
            numberOfTurns = track.numberOfTurns,
            surfaceType = track.surfaceType,
            trackDirection = track.trackDirection,
            yearBuilt = track.yearBuilt,
            websiteUrl = track.websiteUrl,
            phoneNumber = track.phoneNumber,
            emailAddress = track.emailAddress,
            maxElevationChange = track.maxElevationChange,
            bankingAngles = track.bankingAngles,
            runOffAreas = track.runOffAreas,
            pitLaneLength = track.pitLaneLength,
            numberOfPitStalls = track.numberOfPitStalls,
            trackRecordCar = track.trackRecordCar,
            trackRecordMotorcycle = track.trackRecordMotorcycle,
            trackLayoutImageUrl = track.trackLayoutImageUrl,
            satelliteImageUrl = track.satelliteImageUrl,
            trackDayOrganizations = track.trackDayOrganizations,
            typicalPricing = track.typicalPricing,
            availableDates = track.availableDates,
            trackDaySchedule = track.trackDaySchedule,
            requiredSafetyEquipment = track.requiredSafetyEquipment,
            noiseRestrictions = track.noiseRestrictions,
            fuelAvailability = track.fuelAvailability,
            amenities = track.amenities,
            aiDifficultyRating = track.aiDifficultyRating,
            aiDifficultyExplanation = track.aiDifficultyExplanation,
            aiAssessmentDate = track.aiAssessmentDate,
            averageUserRating = track.averageUserRating,
            numberOfReviews = track.numberOfReviews,
            updatedAt = java.time.LocalDateTime.now()
        )
        return trackRepository.save(updatedTrack)
    }
    
    fun deleteTrack(id: Long): Boolean {
        return if (trackRepository.existsById(id)) {
            trackRepository.deleteById(id)
            true
        } else {
            false
        }
    }
} 