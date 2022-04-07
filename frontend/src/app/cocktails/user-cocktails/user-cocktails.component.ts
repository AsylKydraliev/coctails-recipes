import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable, Subscription } from 'rxjs';
import { Cocktail } from '../../models/cocktail.model';
import { fetchCocktailsUserRequest } from '../../store/cocktails/cocktails.actions';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-cocktails',
  templateUrl: './user-cocktails.component.html',
  styleUrls: ['./user-cocktails.component.sass']
})
export class UserCocktailsComponent implements OnInit {
  cocktails: Observable<Cocktail[]>;
  loading: Observable<boolean>;
  user: Observable<User | null>;
  userId!: string;
  api = environment.apiUrl;
  userSub!: Subscription;

  constructor(private store: Store<AppState>) {
    this.cocktails = store.select(state => state.cocktails.cocktails);
    this.loading = store.select(state => state.cocktails.fetchLoading);
    this.user = store.select(state => state.users.user);
    this.userSub = this.user.subscribe(user => {
      this.userId = <string>user?._id;
    })
  }

  ngOnInit() {
    this.store.dispatch(fetchCocktailsUserRequest({userId: this.userId}));
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
