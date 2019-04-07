import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  selectedCategory: string;
  addProcess: boolean;
  addForm: FormGroup;

  products: Product[];


  constructor(private productService: ProductService, private router: Router, private formBuilder: FormBuilder) {
    this.addProcess = false;
    this.addForm = this.formBuilder.group({
      name: new FormControl(),
      price: new FormControl(),
      description: new FormControl()
    })
  }


  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts()
      .subscribe(res =>{
        this.products = res["products"];
      });
  }


  confirmDelete(id: string, i: number) {
    if(confirm('El producto se borrará de tu lista de productos...')){
      this.productService.deleteProduct(id)
        .subscribe(
          res =>{
            console.log(res);
            console.log("Se ha borrado correctamente ", i);
            //this.getProducts();
            //Two way data binding!
            this.products.splice(i,1);
            console.log("Se ha borrado correctamente ", this.products);

          },
          err => {
            this.handleError(err);
          });
    }
  }

  triggerAdd () {this.addProcess = !this.addProcess;}

  addProduct () {
    if ( this.addForm.value.name !== null && this.addForm.value.price !== null && this.addForm.value.description !== null && this.selectedCategory !== undefined){
      const p = new Product('', this.addForm.value.name, '', this.addForm.value.price, this.selectedCategory, this.addForm.value.description)
      this.productService.postProduct(p)
        .subscribe(res => console.log('Result: \n', res));
      this.getProducts();
      this.triggerAdd();
    }
    else {alert('You have to fill correctly the fields, not so difficult...')};
  }










  private handleError(err: HttpErrorResponse) {
    if( err.status == 500 ) {
      alert(err);
    }
  }

  goBack() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('');
  }
}
