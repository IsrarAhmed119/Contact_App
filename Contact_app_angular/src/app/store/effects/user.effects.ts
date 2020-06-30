import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';

import { of, Observable } from 'rxjs';
import { map, tap, exhaustMap, catchError } from 'rxjs/operators';

import {
  LoginUser,
  SignupUser,
  GetCurrentUser,
  LoginUserSuccess,
  CommonFaliure,
  UpdateUser,
  CommonSuccess,
  UserActionTypes,
  LoginUserFaliure,
} from './../actions/user.actions';
import { Router } from '@angular/router';

import { UserService } from './../../services/userServices/user.service';

@Injectable()
export class UserEffects {
  constructor(
    private _userService: UserService,
    private _router: Router,
    private _action: Actions
  ) {}

  @Effect()
  SignupUser: Observable<any> = this._action.pipe(
    ofType(UserActionTypes.SIGNUP_USER),
    map((action: SignupUser) => action.payload),
    exhaustMap((payload) =>
      this._userService.signupUser(payload).pipe(
        map((response) => {
          if (response.status) {
            return new CommonSuccess({
              type: UserActionTypes.SIGNUP_USER,
              response,
            });
          }
        }),
        catchError((error) => {
          return of(
            new CommonFaliure({ type: UserActionTypes.SIGNUP_USER, error })
          );
        })
      )
    )
  );

  @Effect()
  LoginUser: Observable<any> = this._action.pipe(
    ofType(UserActionTypes.LOGIN_USER),
    map((action: LoginUser) => action.payload),
    exhaustMap((payload) =>
      this._userService.loginUser(payload).pipe(
        map((user) => {
          if (user.status === true) {
            console.log('LoginUser_effect_user.status === true');
            return new LoginUserSuccess({
              type: UserActionTypes.LOGIN_USER,
              response: user.status,
              token: user.token,
            });
          } else {
            console.log('LoginUser_effect_user.status != true');
            return new LoginUserFaliure({
              type: UserActionTypes.LOGIN_USER,
              token: null,
              user,
            });
          }
        }),
        catchError((error) => {
          return of(
            new CommonFaliure({ type: UserActionTypes.LOGIN_USER, error })
          );
        })
      )
    )
  );

  // LoginUserSuccess
  @Effect({ dispatch: false })
  LoginUserSuccess: Observable<any> = this._action.pipe(
    ofType(UserActionTypes.LOGIN_USER_SUCCESS),
    tap((user) => {
      this._userService.setToken(user.payload.token);

      this._router.navigate(['/home']);
    })
  );
  // LoginUserFALIURE
  @Effect({ dispatch: false })
  LoginUserFaliure: Observable<any> = this._action.pipe(
    ofType(UserActionTypes.LOGIN_USER_FALIURE),
    tap((user) => {
      this._router.navigateByUrl('signup');
    })
  );

  @Effect()
  UpdateUser: Observable<any> = this._action.pipe(
    ofType(UserActionTypes.UPDATE_USER),
    map((action: UpdateUser) => action.payload),
    exhaustMap((payload) =>
      this._userService.updateUser(payload.postObj, payload.id).pipe(
        map((response) => {
          if (response.status) {
            return new CommonSuccess({
              type: UserActionTypes.UPDATE_USER,
              response,
            });
          }
        }),
        catchError((error) => {
          return of(
            new CommonFaliure({ type: UserActionTypes.UPDATE_USER, error })
          );
        })
      )
    )
  );

  @Effect()
  GetCurrentUser: Observable<any> = this._action.pipe(
    ofType(UserActionTypes.CURRENT_USER),
    exhaustMap(() =>
      this._userService.currentUser().pipe(
        map((response) => {
          // console.log("response_user-effects--->>", response);
          if (response.status) {
            return new CommonSuccess({
              type: UserActionTypes.CURRENT_USER,
              response,
            });
          }
        }),
        catchError((error) => {
          // console.log("response_user-effects_error--->>", error);
          return of(
            new CommonFaliure({ type: UserActionTypes.CURRENT_USER, error })
          );
        })
      )
    )
  );
}
