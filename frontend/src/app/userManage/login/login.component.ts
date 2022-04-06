import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { fbLoginUserData, googleLoginUserData, LoginError, LoginUserData } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { loginFbRequest, loginGoogleRequest, loginUsersRequest } from '../../store/users/users.actions';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})

export class LoginComponent implements OnInit, OnDestroy{
  @ViewChild('f') form!: NgForm;
  loading: Observable<boolean>;
  fbLoading: Observable<boolean>;
  googleLoading: Observable<boolean>;
  error: Observable<null | LoginError>;
  authStateSub!: Subscription;
  fbUserData!: fbLoginUserData;
  googleUserData!: googleLoginUserData;
  fbLoginClick = false;
  googleLoginClick = false;

  constructor(private store: Store<AppState>, private auth: SocialAuthService) {
    this.loading = store.select(state => state.users.loginLoading);
    this.fbLoading = store.select(state => state.users.fbLoading);
    this.googleLoading = store.select(state => state.users.googleLoading);
    this.error = store.select(state => state.users.loginError);
  }

  ngOnInit() {
    this.authStateSub = this.auth.authState.subscribe((user: SocialUser) => {
      if(!user) return;

      if(this.googleLoginClick){
        if(user.provider === "GOOGLE"){
          this.googleUserData = {
            authToken: user.authToken,
            id: user.id,
            email: user.email,
            name: user.name,
            avatar: user.photoUrl,
            accessToken: user.response.access_token
          }
        }
        this.store.dispatch(loginGoogleRequest({userData: this.googleUserData}));
      }

      if(this.fbLoginClick){
        if(user.provider === "FACEBOOK"){
          this.fbUserData = {
            authToken: user.authToken,
            id: user.id,
            email: user.email,
            name: user.name,
            avatar: user.response.picture.data.url
          }
        }
        this.store.dispatch(loginFbRequest({userData: this.fbUserData}));
      }
    })
  }

  onSubmit() {
    const userData: LoginUserData = this.form.value;
    this.store.dispatch(loginUsersRequest({userData}));
  }

  fbLogin(){
    this.fbLoginClick = true;
    void this.auth.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  googleLogin(){
    this.googleLoginClick = true;
    void this.auth.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  ngOnDestroy() {
    this.authStateSub.unsubscribe();
  }
}
