import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

// redux
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { UserState, selectUserState } from './../../store/state/app.state';
import {
  UserActionTypes,
  SignupUser,
} from './../../store/actions/user.actions';
// redux

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  submit = false;
  signupForm: FormGroup;
  userFromState: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    // redux
    private _store: Store<UserState> // redux
  ) {
    this.userFromState = this._store.select(selectUserState);
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });

    this.userFromState.subscribe((state) => {
      // console.log("signup_state--------->>", state);
      if (state.type === UserActionTypes.SIGNUP_USER) {
        var res = state.response;
        console.log('SIGNUP_USER_func_res_', res);
        if (res.status === true) {
          console.log('res.status === true');
          this._router.navigate(['/login']);
        }
      }
    });
  }

  get form() {
    return this.signupForm.controls;
  }

  onSubmit() {
    this.submit = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    }
    console.log('signupForm_onSubmit_call---->>');
    if (this.signupForm.invalid) {
      this.submit = true;
      return;
    }

    var postBody = this.signupForm.value;
    console.log('form_value---->>', postBody);

    this._store.dispatch(new SignupUser(postBody));
  }
}
