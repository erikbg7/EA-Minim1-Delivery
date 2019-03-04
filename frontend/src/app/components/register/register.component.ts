import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.service";
import { HttpErrorResponse } from "@angular/common/http";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  confirmEmail: string;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
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
