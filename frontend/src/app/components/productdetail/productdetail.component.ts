import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {

  selectedCategory: string;

  product: Product;
  updateProcess: boolean;
  updateForm: FormGroup;


  constructor(private activatedRouter: ActivatedRoute, private productService: ProductService, private formBuilder: FormBuilder, private router: Router) {
    this.product = new Product();
    this.updateProcess = false;
    this.updateForm = this.formBuilder.group({
      name: new FormControl(),
      price: new FormControl(),
      description: new FormControl()
    })
  }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      if (typeof params['id'] !== 'undefined') {
        this.product._id = params['id'];
      } else {
        this.product._id = '';
      }
    });
    this.getSingleProduct(this.product._id);
  }




  getSingleProduct(id: string) {
    this.productService.getSingleProduct(id)
      .subscribe(res =>{
        this.product = res["product"];
      });
    console.log(this.product);
  }

  triggerUpdate () { this.updateProcess = !this.updateProcess; }

  updateProduct () {
    if (this.updateForm.value.name !== null) this.product.name = this.updateForm.value.name;
    if (this.updateForm.value.price !== null) this.product.price = this.updateForm.value.price;
    if (this.updateForm.value.description !== null) this.product.description = ' ' + this.updateForm.value.description;
    if (this.selectedCategory !== undefined) this.product.category = this.selectedCategory;

    this.productService.updateProduct(this.product)
      .subscribe( res => {
        console.log(res);
      });
    //this.updateProcess = false;
    this.router.navigateByUrl('/api/product');

  }


  goBack() {
    localStorage.removeItem('token');
  }
}
