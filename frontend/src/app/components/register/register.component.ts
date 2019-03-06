import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { HttpErrorResponse } from "@angular/common/http";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
//import {MyErrorStateMatcher} from "./MyErrorStateMatcher";
import {User} from "../../models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  validation_messages: any;

  confirmPassw: string;

  //matcher = new MyErrorStateMatcher();

  constructor(private userService: AuthService,
              private router: Router, private formBuilder: FormBuilder) {

    this.registerForm = this.formBuilder.group({
        displayName: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(25)])),

        email: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)])),

        password: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/^(?=.*\d).{4,8}$/)])),

        confirmPassw: new FormControl('', Validators.compose([
          Validators.required,
          Validators.pattern(/^(?=.*\d).{4,8}$/)]))
      },
      //{validator: this.checkEmails }
    )
  }

  ngOnInit() {
    this.validation_messages = {
      'displayName': [
        { type: 'required', message: 'Name is required'},
        { type: 'minLength', message: 'Name has to be at least length is 4'},
        { type: 'maxLength', message: 'Name has a maximmum of 25 characters'}
      ],
      'email': [
        { type: 'required', message: 'Email is required' },
        { type: 'pattern', message: 'Email must be valid. Must contain a @ and only one dot in the domain. Domain between 2 and 3 characters long' }
      ],
      'password': [
        { type: 'required', message: 'Password is required' },
        { type: 'pattern', message: 'Password must be valid. Must contain at least one number and must be between 4 and 8 characters' }
      ],
      'confirmPassw': [
        { type: 'required', message: 'Password is required and both must match' },
        { type: 'pattern', message: 'Password must be valid. Must contain at least one number and must be between 4 and 8 characters' }
      ]
    }
  }

  register() {
    console.log(this.registerForm.value);
    let user = new User(this.registerForm.value.displayName, this.registerForm.value.email, this.registerForm.value.password, this.registerForm.value.confirmPassw);
    this.userService.signup(user)
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
  }

 /* checkEmails(group: FormGroup) { // here we have the 'emails' group
    let email = group.controls.email.value;
    let confirmEmail = group.controls.confirmEmail.value;

    return email === confirmEmail ? null : { notSame: true }
  }*/

  private handleError(err: HttpErrorResponse) {
    if( err.status == 500 ) {
      alert(err);
    } else if ( err.status == 404 ) {
      alert('The user is wrong');
    }
  }
}
