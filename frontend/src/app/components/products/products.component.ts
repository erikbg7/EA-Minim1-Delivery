import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private location: Location, private productService: ProductService) { }

  products: Product[];

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts()
      .subscribe(res =>{
        console.log(res);
        this.products = res["products"];
      });
  }

  goBack() {
    localStorage.removeItem('token');
    this.location.back();
  }
}
