import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productService: ProductService, private router: Router) { }

  products: Product[];

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts()
      .subscribe(res =>{
        this.products = res["products"];
      });
  }

  goBack() {
    localStorage.removeItem('token');
  }
}
