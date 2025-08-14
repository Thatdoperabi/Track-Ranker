package com.trackranker.model

import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name = "tracks")
data class Track(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    
    @Column(name = "name", nullable = false)
    val name: String,
    
    @Column(name = "city", nullable = false)
    val city: String,
    
    @Column(name = "state", nullable = false)
    val state: String,
    
    @Column(name = "zip_code")
    val zipCode: String? = null,
    
    @Column(name = "track_length")
    val trackLength: Float? = null,
    
    @Column(name = "track_width")
    val trackWidth: Int? = null,
    
    @Column(name = "number_of_turns")
    val numberOfTurns: Int? = null,
    
    @Column(name = "surface_type")
    val surfaceType: String? = null,
    
    @Column(name = "track_direction")
    val trackDirection: String? = null,
    
    @Column(name = "year_built")
    val yearBuilt: Int? = null,
    
    @Column(name = "website_url")
    val websiteUrl: String? = null,
    
    @Column(name = "phone_number")
    val phoneNumber: String? = null,
    
    @Column(name = "email_address")
    val emailAddress: String? = null,
    
    @Column(name = "max_elevation_change")
    val maxElevationChange: Int? = null,
    
    @Column(name = "banking_angles")
    val bankingAngles: String? = null,
    
    @Column(name = "run_off_areas")
    val runOffAreas: String? = null,
    
    @Column(name = "pit_lane_length")
    val pitLaneLength: Int? = null,
    
    @Column(name = "number_of_pit_stalls")
    val numberOfPitStalls: Int? = null,
    
    @Column(name = "track_record_car")
    val trackRecordCar: String? = null,
    
    @Column(name = "track_record_motorcycle")
    val trackRecordMotorcycle: String? = null,
    
    @Column(name = "track_layout_image_url")
    val trackLayoutImageUrl: String? = null,
    
    @Column(name = "satellite_image_url")
    val satelliteImageUrl: String? = null,
    
    @Column(name = "ai_difficulty_rating")
    val aiDifficultyRating: Int? = null,
    
    @Column(name = "ai_difficulty_explanation")
    val aiDifficultyExplanation: String? = null,
    
    @Column(name = "average_user_rating")
    val averageUserRating: Float? = null,
    
    @Column(name = "number_of_reviews")
    val numberOfReviews: Int? = null,
    
    @Column(name = "created_at")
    val createdAt: LocalDateTime? = null,
    
    @Column(name = "updated_at")
    val updatedAt: LocalDateTime? = null,
    
    @Column(name = "ai_assessment_date")
    val aiAssessmentDate: LocalDateTime? = null,
    
    @Column(name = "amenities")
    val amenities: String? = null,
    
    @Column(name = "available_dates")
    val availableDates: String? = null,
    
    @Column(name = "fuel_availability")
    val fuelAvailability: String? = null,
    
    @Column(name = "noise_restrictions")
    val noiseRestrictions: String? = null,
    
    @Column(name = "required_safety_equipment")
    val requiredSafetyEquipment: String? = null,
    
    @Column(name = "track_day_organizations")
    val trackDayOrganizations: String? = null,
    
    @Column(name = "track_day_schedule")
    val trackDaySchedule: String? = null,
    
    @Column(name = "typical_pricing")
    val typicalPricing: String? = null,
    
    @Column(name = "latitude")
    val latitude: Float? = null,
    
    @Column(name = "longitude")
    val longitude: Float? = null
) 