import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  private urlAPI = "http://localhost:3000";

  loged : boolean = false;
  
  constructor(private http : HttpClient) { }

  getUser(email:string , password: string){
    return this.http.get<User>(`${this.urlAPI}/users/?email=${email}&password=${password}`)
  }

//octaviomgfernandes@gmail.com

}
