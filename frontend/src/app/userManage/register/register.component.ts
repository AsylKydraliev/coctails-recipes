import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fbLoginUserData, googleLoginUserData, RegisterError } from '../../models/user.model';
import { Observable, Subscription } from 'rxjs';
import { loginFbRequest, loginGoogleRequest, registerUserRequest } from '../../store/users/users.actions';
import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

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
  googleLoading: Observable<boolean>;
  authStateSub!: Subscription;
  fbUserData!: fbLoginUserData;
  googleUserData!: googleLoginUserData;
  fbLoginClick = false;
  googleLoginClick = false;

  constructor(private store: Store<AppState>, private auth: SocialAuthService) {
    this.error = store.select(state => state.users.registerError);
    this.loading = store.select(state => state.users.registerLoading);
    this.googleLoading = store.select(state => state.users.googleLoading);
    this.fbLoading = store.select(state => state.users.fbLoading);
  }

  ngAfterViewInit() {
    this.errorSubscription = this.error.subscribe(error => {
      if(error){
        const message = error.errors.email.message;
        this.form.form.get('email')?.setErrors({serverError: message});
      }else{
        this.form.form.get('email')?.setErrors({});
      }
    });
  }

  ngOnInit(){
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
    this.store.dispatch(registerUserRequest({users: this.form.value}));
  }

  fbLogin(){
    this.fbLoginClick= true;
    void this.auth.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  googleLogin(){
    this.googleLoginClick = true;
    void this.auth.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  ngOnDestroy() {
    this.authStateSub.unsubscribe();
    this.errorSubscription.unsubscribe();
  }
}
