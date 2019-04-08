import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {BikesService} from "../../services/bikes/bikes.service";
import {Station} from "../../models/station/station";
import {Bike} from "../../models/bike/bike";

@Component({
  selector: 'app-station-detail',
  templateUrl: './station-detail.component.html',
  styleUrls: ['./station-detail.component.css']
})
export class StationDetailComponent implements OnInit {

  bikes: Bike[];
  stationBikes: Bike[];
  station: Station;
  stationId: String;


  constructor(private activatedRouter: ActivatedRoute, private bikesService: BikesService, private router: Router) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      console.log('params ', params['id']);
      if (typeof params['id'] !== 'undefined') {
        this.stationId = params['id'];
      } else {
        this.stationId = '';
      }
    });

    console.log("id --> ", this.stationId);
    this.getBikes();

  }

  getBikes(){
    this.bikesService.getBikes()
      .subscribe(res =>{
        console.log("res", res);
        this.bikes = res["bikes"];
        this.stationBikes = this.bikes.filter(bike => bike.station === this.stationId);
      });
  }



}
