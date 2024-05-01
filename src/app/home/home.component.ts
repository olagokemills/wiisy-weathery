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
  constructor(public utils: UtilitiesService) {}
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
}
