import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private readonly API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY'; // You'll need to get this
  private readonly BASE_URL = 'https://maps.googleapis.com/maps/api/staticmap';

  constructor() { }

  generateSatelliteImageUrl(latitude: number, longitude: number, zoom: number = 15): string {
    const params = new URLSearchParams({
      center: `${latitude},${longitude}`,
      zoom: zoom.toString(),
      size: '400x300',
      maptype: 'satellite',
      key: this.API_KEY
    });

    return `${this.BASE_URL}?${params.toString()}`;
  }

  generateMapImageUrl(latitude: number, longitude: number, zoom: number = 15): string {
    const params = new URLSearchParams({
      center: `${latitude},${longitude}`,
      zoom: zoom.toString(),
      size: '400x300',
      maptype: 'roadmap',
      key: this.API_KEY
    });

    return `${this.BASE_URL}?${params.toString()}`;
  }
} 