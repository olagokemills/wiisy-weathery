import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { DetailsComponent } from './details/details.component';
import { RouterModule, Routes } from '@angular/router';
import { TemperaturePipe } from '../core/pipe/temperature.pipe';

const HomeRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'details/:cityName',
    component: DetailsComponent,
  },
];

@NgModule({
  declarations: [HomeComponent, DetailsComponent, TemperaturePipe],
  imports: [CommonModule, RouterModule.forChild(HomeRoutes)],
})
export class HomeModule {}
