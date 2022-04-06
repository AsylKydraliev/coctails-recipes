import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fbLoginUserData, RegisterError } from '../../models/user.model';
import { Observable, Subscription } from 'rxjs';
import { loginFbRequest, registerUserRequest } from '../../store/users/users.actions';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('f') form!: NgForm;
  error: Observable<null | RegisterError>;
  errorSubscription!: Subscription;
  loading: Observable<boolean>;
  fbLoading: Observable<boolean>;
  authStateSub!: Subscription;
  fbUserData!: fbLoginUserData;

  constructor(private store: Store<AppState>, private auth: SocialAuthService) {
    this.error = store.select(state => state.users.registerError);
    this.loading = store.select(state => state.users.registerLoading);
    this.fbLoading = store.select(state => state.users.fbLoading);
  }

  ngAfterViewInit() {
    this.errorSubscription = this.error.subscribe(error => {
      if (error) {
        const message = error.errors.email.message;
        this.form.form.get('email')?.setErrors({serverError: message});
      } else {
        this.form.form.get('email')?.setErrors({});
      }
    });
  }

  ngOnInit() {
    this.authStateSub = this.auth.authState.subscribe((user: SocialUser) => {
      if (!user) return;

      if (user.provider === 'FACEBOOK') {
        this.fbUserData = {
          authToken: user.authToken,
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.response.picture.data.url
        }
      }
      this.store.dispatch(loginFbRequest({userData: this.fbUserData}));
    })
  }

  onSubmit() {
    this.store.dispatch(registerUserRequest({users: this.form.value}));
  }

  fbLogin() {
    void this.auth.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  ngOnDestroy() {
    this.authStateSub.unsubscribe();
    this.errorSubscription.unsubscribe();
  }
}
