import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrackImageService {
  private readonly API_KEY = 'AIzaSyDuwavfyVYXePugpge95AG26uGdY-gM1d0'; // Your actual API key
  private readonly BASE_URL = 'https://maps.googleapis.com/maps/api/staticmap';
  
  getTrackLayoutImage(trackName: string): string {
    return this.createPlaceholderImage(trackName + ' Layout', '#0066cc');
  }

  getSatelliteImage(latitude?: number, longitude?: number): string {
    if (!latitude || !longitude) {
      return this.createPlaceholderImage('Satellite View', '#666666');
    }

    // Track-specific configurations with range checking
    const trackConfigs = [
      { 
        latRange: [39.537, 39.540], 
        lngRange: [-122.333, -122.330], 
        zoom: 14, 
        name: 'Thunderhill' 
      },
      { 
        latRange: [38.160, 38.164], 
        lngRange: [-122.456, -122.452], 
        zoom: 14, 
        name: 'Sonoma' 
      },
      { 
        latRange: [34.142, 34.147], 
        lngRange: [-83.820, -83.810], 
        zoom: 14, 
        name: 'Road Atlanta' 
      },
      { 
        latRange: [43.797, 43.800], 
        lngRange: [-87.989, -87.987], 
        zoom: 14, 
        name: 'Road America' 
      },
      { 
        latRange: [40.688, 40.691], 
        lngRange: [-82.637, -82.635], 
        zoom: 14, 
        name: 'Mid-Ohio Sports Car Course' 
      },
      { 
        latRange: [37.001, 37.004], 
        lngRange: [-86.369, -86.366], 
        zoom: 14, 
        name: 'NCM Motorsports Park' 
      },
      { 
        latRange: [36.560, 36.563], 
        lngRange: [-79.209, -79.206], 
        zoom: 14, 
        name: 'Virginia International Raceway' 
      },
      { 
        latRange: [38.273, 38.276], 
        lngRange: [-92.890, -92.887], 
        zoom: 14, 
        name: 'Ozark International Raceway' 
      },
      { 
        latRange: [30.134, 30.137], 
        lngRange: [-97.636, -97.633], 
        zoom: 14, 
        name: 'Circuit of the Americas' 
      },
      { 
        latRange: [39.359, 39.363], 
        lngRange: [-75.066, -75.062], 
        zoom: 14, 
        name: 'New Jersey Motorsports Park' 
      },
      { 
        latRange: [45.365, 45.368], 
        lngRange: [-120.747, -120.743], 
        zoom: 14, 
        name: 'Oregon Raceway Park' 
      },
    ];

    // Find matching track configuration
    let zoom = 15; // default zoom
    for (const config of trackConfigs) {
      if (latitude >= config.latRange[0] && latitude <= config.latRange[1] &&
          longitude >= config.lngRange[0] && longitude <= config.lngRange[1]) {
        zoom = config.zoom;
        break;
      }
    }

    const params = new URLSearchParams({
      center: `${latitude},${longitude}`,
      zoom: zoom.toString(),
      size: '400x300',
      maptype: 'satellite',
      key: this.API_KEY
    });

    const url = `${this.BASE_URL}?${params.toString()}`;
    return url;
  }

  getFallbackImage(): string {
    return this.createPlaceholderImage('Image Unavailable', '#999999');
  }

  private createPlaceholderImage(text: string, color: string): string {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${color}"/>
        <text x="50%" y="50%" font-family="Arial" font-size="16" fill="white" text-anchor="middle" dy=".3em">${text}</text>
      </svg>
    `)}`;
  }
} 