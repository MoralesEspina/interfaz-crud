import { SecurityService } from './security.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private _security : SecurityService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenReq = req.clone({
      setHeaders:{
        Authorization : 'Bearer '+ this._security.getToken()
      }

    })
    return next.handle(tokenReq);
  }
}
