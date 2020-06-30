import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// redux
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import {
  ContactState,
  UserState,
  selectUserState,
  selectContactState,
} from './../../store/state/app.state';

import {
  GetAllContact,
  ContactActionTypes,
  RemoveContact,
} from './../../store/actions/contact.actions';

import {
  GetCurrentUser,
  UserActionTypes,
} from '../../store/actions/user.actions';
// redux

import { UserService } from './../../services/userServices/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public userName: string;
  public userEmail: string;
  currentUser;
  contactList;
  contactFromState: Observable<any>;
  UserFromState: Observable<any>;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _store: Store<ContactState>,
    private _storeUser: Store<UserState>
  ) {
    this.contactFromState = this._store.select(selectContactState);
    this.UserFromState = this._storeUser.select(selectUserState);
  }

  ngOnInit() {
    this._storeUser.dispatch(new GetCurrentUser());
    this.get_All();
    this.UserFromState.subscribe((state) => {
      if (state.type === UserActionTypes.CURRENT_USER) {
        var res = state.response;
        if (res.status === true) {
          // console.log('RemoveContact_res.status === true');
          console.log('CURRENT_USER_func_res', res);
          // this.currentUser = res;
          this.userName = res.name;
          this.userEmail = res.email;
        }
        console.log('CURRENT_USER_func_err', res.error);
      }
    });
    this.contactFromState.subscribe((state) => {
      // console.log("login_state--------->>", state);
      if (state.type === ContactActionTypes.REMOVE_CONTACT) {
        var res = state.response;
        if (res.status === true) {
          // console.log('RemoveContact_res.status === true');
          this.get_All();
        }
        console.log('Remove_func_err', res.error);
      }
    });
    this.contactFromState.subscribe((state) => {
      // console.log("login_state--------->>", state);
      if (state.type === ContactActionTypes.GET_ALL_CONTACT) {
        var res = state.response;
        if (res.status === true) {
          // console.log('res.status === true');
          // console.log('getAll_func_res', res);
          this.contactList = res.contacts;
          console.log('this.contactList---->>', this.contactList);
        }
        console.log('getAll_func_err', res.error);
      }
    });
  }
  get_All() {
    this._store.dispatch(new GetAllContact());
  }
  delete(contact) {
    this._store.dispatch(new RemoveContact(contact._id));
  }
  logoutEventHandler(event) {
    // console.log('home_logoutEventHander------>>');

    if (event === true) {
      this._userService.logOut();
    }
  }
}
