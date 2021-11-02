import { SecurityService } from './services/security.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _security: SecurityService, private _router:Router){

  }
  canActivate():  boolean {
    if(this._security.logedIn()){
      return true;
    }
    this._router.navigate(['login'])
    return false;
  }

}
