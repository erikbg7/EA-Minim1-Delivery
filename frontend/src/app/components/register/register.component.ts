import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Validator} from "validator.ts/Validator";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  confirmEmail: string;

  validation_messages: any;

  validator: Validator;

  isEmail: boolean;

  constructor(private userService: AuthService,
              private router: Router, private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      displayName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25)])),

      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$")])),

      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^(?=.*\d).{4,8}$")]))
    })

  }

  ngOnInit() {
    this.validation_messages = {
      'displayName': [
        { type: 'minLength', message: 'Nombre minim de caracters es 4'},
        { type: 'maxLength', message: 'Nombre maxim de caracters es 25'},
        { type: 'required', message: 'Nombre es requerit'}
      ],
      'email': [
        { type: 'required', message: 'E-mail es requerit'}
      ],
      'password': [
        { type: 'required', message: 'Password es requerit'}
      ]
    }
  }

  register(registerForm: NgForm) {
    console.log(registerForm.value);
    this.userService.signup(registerForm.value)
      .subscribe(
        res => {
          console.log(res);
          let token = res['token'];
          localStorage.setItem('token', token);
          window.location.href = '/api/product';
        },
        err => {
          console.log(err);
          this.handleError(err);
        });
  }

  private handleError(err: HttpErrorResponse) {
    if( err.status == 500 ) {
      alert(err);
    }
  }
}
