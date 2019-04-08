import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from "../environment";
import {Station} from "../../models/station/station";

@Injectable({
  providedIn: 'root'
})
export class StationsService {

  environment: Environment;
  selectedStation: Station;
  stations: Station[];

  constructor(private http: HttpClient) {
    this.selectedStation = new Station();
    this.environment = new Environment();
  }

  getStations() {
    return this.http.get(this.environment.urlStation);
  }

  getStationById(_id: string) {
    return this.http.get(this.environment.urlStation + `/${_id}`)
  }

  postStation(station: Station) {
    return this.http.post(this.environment.urlStation, station);
  }

  deleteStation(_id: string) {
    return this.http.delete(this.environment.urlStation + `/${_id}`);
  }
}





