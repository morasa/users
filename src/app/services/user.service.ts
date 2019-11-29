import { Injectable } from '@angular/core';
import { CONFIG } from '../common/const';
import { HttpClient } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http:HttpClient) { }

  get URL(){
    return CONFIG.API; 
  }

  getUers(){
    return this.http.get<any[]>(this.URL+CONFIG.USER['GET']);
  }

  addUser(empDetails:any){
    return this.http.post(this.URL+CONFIG.USER['SAVE'], empDetails)
                   .pipe(catchError(error => {
                     return of("ERROR");
                   }));
      
  }

  updateUser(empDetails:any){
    return this.http.post(this.URL+CONFIG.USER['UPDATE'], empDetails)
                   .pipe(catchError(error => {
                     return of("ERROR");
                   }));
  }

  deleteUser(empid:any){
    return this.http.post(this.URL+CONFIG.USER['DELETE'], empid)
                   .pipe(catchError(error => {
                     return of("ERROR");
                   }));
  }
}
