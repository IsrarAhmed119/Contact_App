import { Action } from '@ngrx/store';

export enum ContactActionTypes {
  ADD_CONTACT = '[Contact] Add Contact',
  UPDATE_CONTACT = '[Contact] Update Contact',
  REMOVE_CONTACT = '[Contact] Remove Contact',
  GET_ALL_CONTACT = '[Contact] Get All Contact',
  GET_ONE_CONTACT = '[Contact] Get One Contact',

  COMMON_SUCCESS = '[Contact] Common Success',
  COMMON_FALIURE = '[Contact] Common Faliure',
}

export class GetAllContact implements Action {
  type = ContactActionTypes.GET_ALL_CONTACT;

  constructor() {}
}
export class GetOneContact implements Action {
  type = ContactActionTypes.GET_ONE_CONTACT;

  constructor(public payload: any) {}
}
export class AddContact implements Action {
  type = ContactActionTypes.ADD_CONTACT;

  constructor(public payload: any) {}
}
export class UpdateContact implements Action {
  type = ContactActionTypes.UPDATE_CONTACT;

  constructor(public payload: any) {}
}
export class RemoveContact implements Action {
  type = ContactActionTypes.REMOVE_CONTACT;

  constructor(public payload: any) {}
}

export class CommonSuccess implements Action {
  type = ContactActionTypes.COMMON_SUCCESS;

  constructor(public payload: any) {}
}
export class CommonFaliure implements Action {
  type = ContactActionTypes.COMMON_FALIURE;

  constructor(public payload: any) {}
}

export type All =
  | GetAllContact
  | AddContact
  | UpdateContact
  | RemoveContact
  | CommonSuccess
  | CommonFaliure;
