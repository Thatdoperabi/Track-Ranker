import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Track, TrackReview } from '../models/track.model';
import { TrackImageService } from './track-image.service';

@Injectable({
  providedIn: 'root'
})
export class TrackService {
  // Local development
  // private apiUrl = 'http://localhost:8080/api/tracks';
  
  // Production
  private apiUrl = 'https://track-ranker-backend-gtgdg6dxawhzgra9.centralus-01.azurewebsites.net/api/tracks';

  constructor(
    private http: HttpClient,
    private trackImageService: TrackImageService
  ) { }

  getTracks(): Observable<Track[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(tracks => tracks.map(track => this.mapTrackFromBackend(track))),
      map(tracks => tracks.map(track => this.addSatelliteImage(track)))
    );
  }

  getTrack(id: number): Observable<Track> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(track => this.mapTrackFromBackend(track)),
      map(track => this.addSatelliteImage(track))
    );
  }

  // Review methods
  getTrackReviews(trackId: number): Observable<TrackReview[]> {
    return this.http.get<TrackReview[]>(`${this.apiUrl}/${trackId}/reviews`);
  }

  submitReview(trackId: number, review: TrackReview): Observable<TrackReview> {
    return this.http.post<TrackReview>(`${this.apiUrl}/${trackId}/reviews`, review);
  }

  updateReview(reviewId: number, review: TrackReview): Observable<TrackReview> {
    return this.http.put<TrackReview>(`${this.apiUrl}/reviews/${reviewId}`, review);
  }

  deleteReview(reviewId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/reviews/${reviewId}`);
  }

  private mapTrackFromBackend(backendTrack: any): Track {
    return {
      id: backendTrack.id,
      name: backendTrack.name,
      city: backendTrack.city,
      state: backendTrack.state,
      zipCode: backendTrack.zipCode,
      trackLength: backendTrack.trackLength,
      trackWidth: backendTrack.trackWidth,
      numberOfTurns: backendTrack.numberOfTurns,
      surfaceType: backendTrack.surfaceType,
      trackDirection: backendTrack.trackDirection,
      yearBuilt: backendTrack.yearBuilt,
      websiteUrl: backendTrack.websiteUrl,
      phoneNumber: backendTrack.phoneNumber,
      emailAddress: backendTrack.emailAddress,
      maxElevationChange: backendTrack.maxElevationChange,
      bankingAngles: backendTrack.bankingAngles,
      runOffAreas: backendTrack.runOffAreas,
      pitLaneLength: backendTrack.pitLaneLength,
      numberOfPitStalls: backendTrack.numberOfPitStalls,
      trackRecordCar: backendTrack.trackRecordCar,
      trackRecordMotorcycle: backendTrack.trackRecordMotorcycle,
      trackLayoutImageUrl: backendTrack.trackLayoutImageUrl,
      satelliteImageUrl: backendTrack.satelliteImageUrl,
      aiDifficultyRating: Number(backendTrack.aiDifficultyRating),
      aiDifficultyExplanation: backendTrack.aiDifficultyExplanation,
      averageUserRating: Number(backendTrack.averageUserRating),
      numberOfReviews: Number(backendTrack.numberOfReviews),
      amenities: backendTrack.amenities,
      availableDates: backendTrack.availableDates,
      fuelAvailability: backendTrack.fuelAvailability,
      noiseRestrictions: backendTrack.noiseRestrictions,
      requiredSafetyEquipment: backendTrack.requiredSafetyEquipment,
      trackDayOrganizations: backendTrack.trackDayOrganizations,
      trackDaySchedule: backendTrack.trackDaySchedule,
      typicalPricing: backendTrack.typicalPricing,
      latitude: Number(backendTrack.latitude),
      longitude: Number(backendTrack.longitude)
    };
  }

  private addSatelliteImage(track: Track): Track {
    // Generate satellite image for tracks with coordinates
    if (track.latitude && track.longitude && track.latitude !== 0 && track.longitude !== 0) {
      track.satelliteImageUrl = this.trackImageService.getSatelliteImage(
        track.latitude, 
        track.longitude
      );
    } else {
      track.satelliteImageUrl = this.trackImageService.getSatelliteImage();
    }
    return track;
  }
} 