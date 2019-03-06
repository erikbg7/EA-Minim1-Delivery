import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { ProductService} from "./product.service";


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  //We use Injector to get an instance of the product service
  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //let productService = this.injector.get(ProductService);
    const newRequest = req.clone({
        headers: req.headers.set(
          'Authorization', `Bearer ${localStorage.getItem('token')}`
        )
    });

    console.log(newRequest);

    //Middleware
    return next.handle(newRequest);
  }
}
