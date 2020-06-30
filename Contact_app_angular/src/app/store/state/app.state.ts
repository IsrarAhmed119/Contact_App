import { createFeatureSelector } from '@ngrx/store';
import * as user from './../reducers/user.reducers';
import * as contact from '../reducers/contact.reducers';

export interface UserState {
  userState: user.State;
}
export interface ContactState {
  contactState: contact.State;
}
export const reducers = {
  user: user.reducer,
  contact: contact.reducer,
};

export const selectUserState = createFeatureSelector<UserState>('user');
export const selectContactState = createFeatureSelector<ContactState>(
  'contact'
);
