import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  selectedUser: User;

  constructor(private http: HttpClient) {
    this.selectedUser = new User();
  }

  signup(user: User) {
    return this.http.post('http://localhost:3001/api/signup', user)
  }

  signin(user: User)  {
    return this.http.post('http://localhost:3001/api/signin', user)
  }
}
