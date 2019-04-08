import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StationsComponent} from "./components/stations/stations.component";
import {BikesComponent} from "./components/bikes/bikes.component";
import {StationDetailComponent} from "./components/station-detail/station-detail.component";
import {HomeComponent} from "./components/home/home.component";

const routes: Routes = [
  { path: 'api/home', component: HomeComponent },
  { path: 'api/station', component: StationsComponent },
  { path: 'api/bike', component: BikesComponent },
  { path: 'api/stationdetail/:id', component: StationDetailComponent, pathMatch: 'full'},
  { path: '', redirectTo: '/api/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
