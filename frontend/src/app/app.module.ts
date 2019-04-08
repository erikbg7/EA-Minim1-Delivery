import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InterceptorService } from "./services/interceptor.service";
import { HomeComponent } from './components/home/home.component';
import { StationsComponent } from './components/stations/stations.component';
import { BikesComponent } from './components/bikes/bikes.component';
import { StationDetailComponent } from './components/station-detail/station-detail.component';

@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,
    StationsComponent,
    BikesComponent,
    StationDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
