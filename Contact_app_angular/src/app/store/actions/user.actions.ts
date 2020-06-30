import { Action } from '@ngrx/store';

export enum UserActionTypes {
  SIGNUP_USER = '[User] Singup User',
  LOGIN_USER = '[User] Login User',

  LOGIN_USER_SUCCESS = '[User] Login User Success',
  LOGIN_USER_FALIURE = '[User] Login User Faliure',

  CURRENT_USER = '[User] Current User',
  UPDATE_USER = '[User] UPDATE User',

  COMMON_SUCCESS = '[User] Common Success',
  COMMON_FALIURE = '[User] Common Faliure',
}

export class SignupUser implements Action {
  type = UserActionTypes.SIGNUP_USER;

  constructor(public payload: any) {}
}

export class LoginUser implements Action {
  type = UserActionTypes.LOGIN_USER;

  constructor(public payload: any) {}
}

export class LoginUserSuccess implements Action {
  type = UserActionTypes.LOGIN_USER_SUCCESS;

  constructor(public payload: any) {
    console.log('LoginUserSuccess_action--->>');
  }
}

export class LoginUserFaliure implements Action {
  type = UserActionTypes.LOGIN_USER_FALIURE;

  constructor(public payload: any) {
    console.log('LoginUserFaliure_action--->>');
  }
}

export class GetCurrentUser implements Action {
  type = UserActionTypes.CURRENT_USER;

  constructor() {}
}
export class UpdateUser implements Action {
  type = UserActionTypes.UPDATE_USER;

  constructor(public payload: any) {}
}

export class CommonSuccess implements Action {
  type = UserActionTypes.COMMON_SUCCESS;

  constructor(public payload: any) {}
}
export class CommonFaliure implements Action {
  type = UserActionTypes.COMMON_FALIURE;

  constructor(public payload: any) {}
}

export type All =
  | SignupUser
  | LoginUser
  | GetCurrentUser
  | UpdateUser
  | LoginUserFaliure
  | LoginUserSuccess
  | CommonSuccess
  | CommonFaliure;
