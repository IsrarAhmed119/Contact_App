import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { urls } from '../../componets/utils/url-utils';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient, private _router: Router) {}

  // Signup User
  signupUser(postBody): Observable<any> {
    console.log('signupUser_call__Service----->>');
    return this._http.post(
      urls.BASE_URL + urls.USER_URL + urls.SIGNIN_URL,
      postBody
    );
  }

  // Login User
  loginUser(postBody): Observable<any> {
    console.log('loginUser_call__Service----->>');
    return this._http.post<any>(urls.BASE_URL + urls.LOGIN_URL, postBody);
  }

  // current User
  updateUser(id, updateObj): Observable<any> {
    // console.log("updateUser_call__Service----->>");
    console.log('updateUserr__call__Service----->>id', id);
    console.log('updateUserr__call__Service----->>obj', updateObj);
    var url = `${urls.BASE_URL + urls.USER_URL}/${id}`;
    console.log('updateUserr__call__Service_url', url);

    return this._http.put<any>(url, updateObj);
  }

  // current User
  currentUser(): Observable<any> {
    // console.log("currentUser_call__Service----->>");
    return this._http.get<any>(
      urls.BASE_URL + urls.USER_URL + urls.CURRENT_USER_URL
    );
  }

  getToken() {
    // console.log("getToken_call__Service----->>");
    return localStorage.getItem('token');
  }

  setToken(token) {
    // console.log("setToken_call__Service----->>", token);
    return localStorage.setItem('token', token);
  }

  // loggedIn or not
  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
    this._router.navigate(['/login']);
  }
}
