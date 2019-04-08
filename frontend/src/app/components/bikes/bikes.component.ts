import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";
import {Bike} from "../../models/bike/bike";
import {BikesService} from "../../services/bikes/bikes.service";
import {Station} from "../../models/station/station";

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.css']
})
export class BikesComponent implements OnInit {

  bikes: Bike[];

  constructor(private bikesService: BikesService, private router: Router) { }

  ngOnInit() {
    this.getStations();
  }

  getStations(){

    this.bikesService.getBikes()
      .subscribe(res =>{
        console.log("res", res);
        this.bikes = res["bikes"];
      });
    console.log(this.bikes);
  }

  confirmDelete(id: string, i: number) {
    if(confirm('This bike will be deleted from your bike list...')){
      this.bikesService.deleteBike(id)
        .subscribe(
          res =>{
            console.log(res);
            console.log("Se ha borrado correctamente ", i);
            //this.getProducts();
            //Two way data binding!
            this.bikes.splice(i,1);
            console.log("Se ha borrado correctamente ", this.bikes);

          })
    }
  }


}
