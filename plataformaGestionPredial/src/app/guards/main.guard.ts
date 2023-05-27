import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Routes, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {

  constructor(private router: Router){

  }

  /*redirect(flag:boolean):any{
    if(!flag){
      this.router.navigation(['/','login'])
    }
  }*/

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var  jwtToken=localStorage.getItem('jwt_token');
    if(!jwtToken){
      this.router.navigate(["/login"],{})
      return false;
    }
    return true;
  }
  
}
