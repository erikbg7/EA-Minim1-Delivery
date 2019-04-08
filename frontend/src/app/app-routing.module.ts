import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from "./components/products/products.component";
import { MyguardGuard } from "./myguard.guard";
import {ProductdetailComponent} from "./components/productdetail/productdetail.component";
import {HomeComponent} from "./components/home/home.component";
import {UsersComponent} from "./components/users/users.component";
import {StationsComponent} from "./components/stations/stations.component";
import {BikesComponent} from "./components/bikes/bikes.component";
import {StationDetailComponent} from "./components/station-detail/station-detail.component";

const routes: Routes = [

  { path: 'api/station', component: StationsComponent },
  { path: 'api/bike', component: BikesComponent },
  { path: 'api/stationdetail/:id', component: StationDetailComponent, pathMatch: 'full'},



  { path: 'api/home', component: HomeComponent },
  { path: 'api/user', component: UsersComponent },
  { path: 'api/product', component: ProductsComponent, canActivate: [MyguardGuard], pathMatch: 'full' },
  { path: 'api/product/:id', component: ProductdetailComponent, canActivate: [MyguardGuard], pathMatch: 'full'},
  { path: '', redirectTo: '/api/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
