import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
import { ForecastData } from 'src/app/core/models/data.models';
import { UtilitiesService } from 'src/app/core/utils/utils.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  sub: any;
  chart: any;
  ForecastPiece: any;
  selectedIndex: any = 0;
  selectedData: any;
  knownCities: Array<string> = ['kansas', 'columbia'];
  constructor(
    private activatedRoute: ActivatedRoute,
    private utils: UtilitiesService
  ) {}

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe((params) => {
      console.log(params);
      const cityName = params['cityName'];
      console.log(cityName);
      if (this.knownCities.includes(cityName)) {
        this.FetchLocationDetails(cityName);
      } else {
        console.log('eh no dey');
      }
    });
  }

  // fetchChart() {
  //   this.http
  //     .get<any>('https://api.weather.gov/gridpoints/TOP/31,80/forecast')
  //     .subscribe((data) => {
  //       const temperatures = data.properties.periods.map(
  //         (period: any) => period.temperature
  //       );
  //       const times = data.properties.periods.map((period: any) =>
  //         this.formatTime(period.startTime)
  //       );
  //       this.createChart(times, temperatures);
  //     });
  // }
  switchIndex(data: any, selectedData: any) {
    this.selectedIndex = data;
    this.selectedData = selectedData;
    console.log(selectedData);
  }
  FetchLocationDetails(data: string) {
    const string = data === 'columbia' ? 'LWX' : 'TOP';
    this.utils.fetchForecast(string).subscribe((res: ForecastData) => {
      this.ForecastPiece = res.properties.periods;
      console.log(this.ForecastPiece);
      const temperatures = res.properties.periods.map(
        (period: any) => period.temperature
      );
      const times = res.properties.periods.map((period: any) =>
        this.formatTime(period.startTime)
      );
      this.createChart(times, temperatures);
    });
  }

  formatTime(timeString: string): string {
    const date = new Date(timeString);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const day = days[date.getDay()];
    const month = months[date.getMonth()];
    const dateNum = date.getDate();
    const year = date.getFullYear();
    return `${day} ${dateNum} ${month} ${year}`;
  }

  createChart(times: string[], temperatures: number[]): void {
    const ctx = document.getElementById('line-chart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line', // Use the normal line type
      data: {
        labels: times,
        datasets: [
          {
            label: 'Temperature (°F)',
            data: temperatures,
            borderColor: 'blue',
            backgroundColor: 'rgba(0, 0, 255, 0.1)', // Shading color
            tension: 0.4,
            fill: {
              target: 'origin', // Fill from origin to the line
              above: 'rgba(0, 0, 255, 0.1)', // Shading color
            },
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Temperature Chart',
          },
        },
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Time',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Temperature (°F)',
            },
          },
        },
      },
    });
  }
}
