import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validator, Validators} from "@angular/forms";
import { UserService } from "../../services/user.service";
import { HttpErrorResponse } from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  validation_messages: any;

  constructor(private userService: UserService,
              private router: Router, private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
        displayName: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(25)]))
    })

  }

  ngOnInit() {
    this.validation_messages = {
      'displayName': [
        { type: 'minLength', message: 'Nombre minim de caracters es 4'},
        { type: 'maxLength', message: 'Nombre maxim de caracters es 25'},
        { type: 'required', message: 'Nombre es requerit'}
      ]
    }
  }

  login() {
    console.log(this.form.value);
    this.form.get("displayName").setErrors({required: true});

    this.userService.signin(this.form.value.displayName)
      .subscribe(
        res => {
          console.log(res);
          let token = res['token'];
          localStorage.setItem('token', token);
          this.router.navigateByUrl("/api/product");
        },
        err => {
          console.log(err);
          this.handleError(err);
        });
    // action ..
  }

  private handleError(err: HttpErrorResponse) {
    if( err.status == 500 ) {
      alert(err);
    } else if ( err.status == 404 ) {
      alert('The user does not exist');
    }
  }
}
