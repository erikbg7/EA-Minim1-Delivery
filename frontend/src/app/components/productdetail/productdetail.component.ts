import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product";
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {

  id: any;

  product: Product;

  constructor(private activatedRouter: ActivatedRoute, private productService: ProductService) {
    this.product = new Product();
  }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.id = params['id'];
      } else {
        this.id = '';
      }
    });
    this.getSingleProduct(this.id);
  }

  getSingleProduct(id: string) {
    this.productService.getSingleProduct(id)
      .subscribe(res =>{
        this.product = res["product"];
      });
    console.log(this.product);
  }

  goBack() {
    localStorage.removeItem('token');
  }
}
