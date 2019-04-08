import { Injectable } from '@angular/core';
import {Environment} from "../environment";
import {HttpClient} from "@angular/common/http";
import {Bike} from "../../models/bike/bike";

@Injectable({
  providedIn: 'root'
})
export class BikesService {


  environment: Environment;
  selectedBike: Bike;
  bikes: Bike[];

  constructor(private http: HttpClient) {
    this.selectedBike = new Bike();
    this.environment = new Environment();
  }

  getBikes() {
    return this.http.get(this.environment.urlBike);
  }


  deleteBike(_id: string) {
    return this.http.delete(this.environment.urlBike + `/${_id}`);
  }




}
