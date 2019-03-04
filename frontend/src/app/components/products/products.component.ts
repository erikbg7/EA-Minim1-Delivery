import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  //Datos dummy que usamos de feed para la vista del producto
  fetchData = [
    {"name":"PC MSI","picture":"pic1","price":"1200","category":"Top Seller", "description":"No description"},
    {"name":"IPhone","picture":"pic2","price":"900","category":"Top Seller", "description":"No description"},
    {"name":"Laptop Backpack","picture":"pic3","price":"12","category":"Top Seller", "description":"No description"},
    {"name":"Mouse + Headphones","picture":"pic4","price":"12","category":"Top Seller", "description":"No description"}];

  goBack() {
    localStorage.removeItem('token');
    this.location.back();
  }
}
