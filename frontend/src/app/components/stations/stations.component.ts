import { Component, OnInit } from '@angular/core';
import {Station} from "../../models/station/station";
import {Router} from "@angular/router";
import {StationsService} from "../../services/stations/stations.service";

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {

  stations: Station[];

  constructor(private stationService: StationsService, private router: Router) { }

  ngOnInit() {
    this.getStations();
  }

  getStations(){

    this.stationService.getStations()
      .subscribe(res =>{
        this.stations = res["stations"];
      });
    console.log(this.stations);

  }

}
