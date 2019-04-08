import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ProductsComponent } from "./components/products/products.component";
import { MyguardGuard } from "./myguard.guard";
import {ProductdetailComponent} from "./components/productdetail/productdetail.component";
import {HomeComponent} from "./components/home/home.component";
import {UsersComponent} from "./components/users/users.component";
import {StationsComponent} from "./components/stations/stations.component";
import {BikesComponent} from "./components/bikes/bikes.component";

const routes: Routes = [

  { path: 'api/station', component: StationsComponent },
  { path: 'api/bike', component: BikesComponent },
  { path: 'api/bike/:id', component: BikesComponent, pathMatch: 'full'},


  { path: 'api/signin', component: LoginComponent },
  { path: 'api/signup', component: RegisterComponent },
  { path: 'api/home', component: HomeComponent },
  { path: 'api/user', component: UsersComponent },
  { path: 'api/product', component: ProductsComponent, canActivate: [MyguardGuard], pathMatch: 'full' },
  { path: 'api/product/:id', component: ProductdetailComponent, canActivate: [MyguardGuard], pathMatch: 'full'},
  { path: '', redirectTo: '/api/signin', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
