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

  convertDateFormat(dateString: string): string {
    const date = new Date(dateString);
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    const period = hours >= 12 ? 'pm' : 'am';
    const formattedDate = `${dayOfWeek}, ${time}${period}`;
    return formattedDate;
  }
  extractTime(data: string) {
    const date = new Date(data);
    const time = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    return time;
  }
}
