import { Injectable } from '@angular/core';
import {Product} from "../models/product";
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) {

  }

  signup(user: User) {
    return this.http.post('http://localhost:3001/api/signup', user)
  }

  signin(user: User) {
    return this.http.post('http://localhost:3001/api/signin', user)
  }
}
