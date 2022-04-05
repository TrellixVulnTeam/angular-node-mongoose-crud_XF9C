import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 
  baseUri:string = 'http://localhost:5000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  createUser(data): Observable<any> {
    let url = `${this.baseUri}/register`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  checkUser(data): Observable<any> {
    let url = `${this.baseUri}/login`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  setLogedUser(data: string) {
    localStorage.setItem('userData', data);
  }
  getLogedUserId() {
    return localStorage.getItem('userData');
  }
  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = error.error.message;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }


  getUserData(id): Observable<any> {
    let url = `${this.baseUri}/getUserData`;
    console.log(url,id);
    return this.http.get(url, id)
      .pipe(
        //catchError(this.errorMgmt)
      )
  }
}
