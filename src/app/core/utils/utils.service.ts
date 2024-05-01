import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ForecastData } from '../models/data.models';

@Injectable({
  providedIn: 'root',
})
export class UtilitiesService {
  baseUrl: string = 'https://api.weather.gov/gridpoints/';
  constructor(
    public fb: FormBuilder,
    public router: Router,
    private http: HttpClient
  ) {}

  fetchForecast(location: string): Observable<ForecastData> {
    return this.http.get<ForecastData>(
      `${this.baseUrl}${location}/31,80/forecast`
    );
  }
}
