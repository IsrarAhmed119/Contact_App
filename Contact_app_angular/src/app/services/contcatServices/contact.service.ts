import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { urls } from '../../componets/utils/url-utils';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private _http: HttpClient, private _router: Router) {}

  getAll_Contact(): Observable<any> {
    // console.log('getAllContact_call__Service----->>');
    return this._http.get<any>(
      urls.BASE_URL + urls.CONTACT_URL + urls.ALL_CONTACT_URL
    );
  }

  add_Contact(postBody): Observable<any> {
    // console.log('addContact_call__Service----->>');
    return this._http.post<any>(
      urls.BASE_URL + urls.CONTACT_URL + urls.ADD_CONTACT_URL,
      postBody
    );
  }

  Update_Contact(id, formData): Observable<any> {
    // console.log('Update_Contact_call__Service----->>');
    var url = `${urls.BASE_URL + urls.CONTACT_URL}/${id}`;
    return this._http.put<any>(url, formData);
  }

  Remove_Contact(id): Observable<any> {
    // console.log('Remove_Contac_call__Service----->>');
    var url = `${urls.BASE_URL + urls.CONTACT_URL}/${id}`;
    return this._http.delete<any>(url);
  }

  Get_One_Contact(id): Observable<any> {
    // console.log('Get_One_Contact_call__Service----->>');
    var url = `${urls.BASE_URL + urls.CONTACT_URL}/${id}`;
    return this._http.get<any>(url);
  }
}
