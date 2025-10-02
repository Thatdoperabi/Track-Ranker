export interface Track {
  id?: number;
  name?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  trackLength?: number;
  trackWidth?: number;
  numberOfTurns?: number;
  surfaceType?: string;
  trackDirection?: string;
  yearBuilt?: number;
  websiteUrl?: string;
  phoneNumber?: string;
  emailAddress?: string;
  maxElevationChange?: number;
  bankingAngles?: string;
  runOffAreas?: string;
  pitLaneLength?: number;
  numberOfPitStalls?: number;
  trackRecordCar?: string;
  trackRecordMotorcycle?: string;
  trackLayoutImageUrl?: string;
  satelliteImageUrl?: string;
  aiDifficultyRating?: number;
  aiDifficultyExplanation?: string;
  averageUserRating?: number;
  numberOfReviews?: number;
  amenities?: string;
  availableDates?: string;
  fuelAvailability?: string;
  noiseRestrictions?: string;
  requiredSafetyEquipment?: string;
  trackDayOrganizations?: string;
  trackDaySchedule?: string;
  typicalPricing?: string;
  latitude?: number;
  longitude?: number;
}

export interface TrackReview {
  id: number;
  trackId: number;
  userDifficultyRating: number;
  userReviewText: string;
  reviewDate: Date;
  userName?: string;
  bikeModel?: string;
}

export interface TrackSuggestion {
  id: number;
  trackName: string;
  location: string;
  userEmail: string;
  suggestionDate: Date;
  status: 'pending' | 'approved' | 'rejected';
} 