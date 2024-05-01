import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../core/utils/utils.service';
import { ForecastData } from '../core/models/data.models';
import { TemperaturePipe } from '../core/pipe/temperature.pipe';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private utils: UtilitiesService) {}
  KansasData: any;
  ColumbiaData: any;
  ngOnInit(): void {
    this.FetchLocationDetails('TOP');
    this.FetchLocationDetails('LWX');
  }
  FetchLocationDetails(data: string) {
    this.utils.fetchForecast(data).subscribe((res: ForecastData) => {
      if (data === 'TOP') {
        this.KansasData = res.properties.periods[0];
      } else {
        this.ColumbiaData = res.properties.periods[0];
      }
    });
  }
  GotoPage(data: string) {
    this.utils.router.navigate(['/details/', data]);
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
}
