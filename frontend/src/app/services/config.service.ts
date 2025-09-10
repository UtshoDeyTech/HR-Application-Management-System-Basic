import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  
  getApiUrl(): string {
    // Dynamically construct API URL based on current location
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    
    // If accessing via localhost, use localhost for API
    // If accessing via IP, use the same IP for API
    return `${protocol}//${hostname}:8080/api`;
  }
}