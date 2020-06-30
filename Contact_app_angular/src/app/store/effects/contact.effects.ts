import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';

import { of, Observable } from 'rxjs';
import { map, tap, exhaustMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  AddContact,
  GetOneContact,
  RemoveContact,
  UpdateContact,
  GetAllContact,
  CommonFaliure,
  ContactActionTypes,
  CommonSuccess,
} from './../actions/contact.actions';

import { ContactService } from './../../services/contcatServices/contact.service';

@Injectable()
export class ContactEffects {
  constructor(
    private _contactService: ContactService,
    private _router: Router,
    private _action: Actions
  ) {}

  @Effect()
  GetAllContact: Observable<any> = this._action.pipe(
    ofType(ContactActionTypes.GET_ALL_CONTACT),
    exhaustMap(() =>
      this._contactService.getAll_Contact().pipe(
        map((response) => {
          console.log('GetAllContact-effects_response_--->>', response);
          if (response.status) {
            return new CommonSuccess({
              type: ContactActionTypes.GET_ALL_CONTACT,
              response,
            });
          }
        }),
        catchError((error) => {
          console.log('GetAllContact-effects_error--->>', error);
          return of(
            new CommonFaliure({
              type: ContactActionTypes.GET_ALL_CONTACT,
              error,
            })
          );
        })
      )
    )
  );

  @Effect()
  AddContact: Observable<any> = this._action.pipe(
    ofType(ContactActionTypes.ADD_CONTACT),
    map((action: AddContact) => action.payload),
    exhaustMap((payload) =>
      this._contactService.add_Contact(payload).pipe(
        map((response) => {
          if (response.status) {
            return new CommonSuccess({
              type: ContactActionTypes.ADD_CONTACT,
              response,
            });
          }
        }),
        catchError((error) => {
          return of(
            new CommonFaliure({ type: ContactActionTypes.ADD_CONTACT, error })
          );
        })
      )
    )
  );

  @Effect()
  UpdateContact: Observable<any> = this._action.pipe(
    ofType(ContactActionTypes.UPDATE_CONTACT),
    map((action: UpdateContact) => action.payload),
    exhaustMap((payload) =>
      this._contactService.Update_Contact(payload.id, payload.formData).pipe(
        map((response) => {
          if (response.status) {
            return new CommonSuccess({
              type: ContactActionTypes.UPDATE_CONTACT,
              response,
            });
          }
        }),
        catchError((error) => {
          return of(
            new CommonFaliure({
              type: ContactActionTypes.UPDATE_CONTACT,
              error,
            })
          );
        })
      )
    )
  );

  @Effect()
  RemoveContact: Observable<any> = this._action.pipe(
    ofType(ContactActionTypes.REMOVE_CONTACT),
    map((action: RemoveContact) => action.payload),
    exhaustMap((payload) =>
      this._contactService.Remove_Contact(payload).pipe(
        map((response) => {
          if (response.status) {
            return new CommonSuccess({
              type: ContactActionTypes.REMOVE_CONTACT,
              response,
            });
          }
        }),
        catchError((error) => {
          return of(
            new CommonFaliure({
              type: ContactActionTypes.REMOVE_CONTACT,
              error,
            })
          );
        })
      )
    )
  );

  @Effect()
  GetOneContact: Observable<any> = this._action.pipe(
    ofType(ContactActionTypes.GET_ONE_CONTACT),
    map((action: GetOneContact) => action.payload),
    exhaustMap((payload) =>
      this._contactService.Get_One_Contact(payload).pipe(
        map((response) => {
          if (response.status) {
            return new CommonSuccess({
              type: ContactActionTypes.GET_ONE_CONTACT,
              response,
            });
          }
        }),
        catchError((error) => {
          return of(
            new CommonFaliure({
              type: ContactActionTypes.GET_ONE_CONTACT,
              error,
            })
          );
        })
      )
    )
  );
}
