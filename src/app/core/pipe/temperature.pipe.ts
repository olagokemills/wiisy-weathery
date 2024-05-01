import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature',
})
export class TemperaturePipe implements PipeTransform {
  transform(value: number, unit: string = 'C'): string {
    // Convert temperature value to Celsius
    const celsiusValue = ((value - 32) * 5) / 9;
    return celsiusValue.toFixed(1) + ' °C';
  }
}
