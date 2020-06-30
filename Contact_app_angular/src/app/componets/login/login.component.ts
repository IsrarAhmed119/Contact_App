import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
// redux
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { UserState, selectUserState } from './../../store/state/app.state';

import { UserActionTypes, LoginUser } from './../../store/actions/user.actions';
// redux

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  submit = false;
  loginForm: FormGroup;
  userFromState: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _store: Store<UserState>
  ) {
    this.userFromState = this._store.select(selectUserState);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });

    this.userFromState.subscribe((state) => {
      // console.log("login_state--------->>", state);
      if (state.type === UserActionTypes.LOGIN_USER) {
        var res = state.response;
        if (res.status === true) {
          console.log('res.status === true');
          this._router.navigate(['/home']);
        }

        console.log('loginUser_func_res_err', res.error);
        // this._router.navigate(["/taskapp"]);
      }
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submit = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    console.log('login_onSubmit_call---->>');
    this.submit = true;
    var postBody = this.loginForm.value;
    console.log('form_value---->>', postBody);
    this._store.dispatch(new LoginUser(postBody));
  }
}
