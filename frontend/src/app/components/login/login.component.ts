import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from "@angular/forms";
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

  constructor(private userService: UserService,
              private router: Router) {

  }

  ngOnInit() {
  }

  login(loginForm: NgForm) {
    console.log(loginForm.value);
    this.userService.signin(loginForm.value)
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
