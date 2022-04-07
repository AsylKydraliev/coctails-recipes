import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable, Subscription } from 'rxjs';
import { Cocktail, CocktailPublish } from '../../models/cocktail.model';
import {
  fetchCocktailsUserRequest,
  publishCocktailRequest,
  removeCocktailsRequest
} from '../../store/cocktails/cocktails.actions';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-cocktails',
  templateUrl: './user-cocktails.component.html',
  styleUrls: ['./user-cocktails.component.sass']
})
export class UserCocktailsComponent implements OnInit, OnDestroy {
  cocktails: Observable<Cocktail[]>;
  loading: Observable<boolean>;
  user: Observable<User | null>;
  userId!: string;
  api = environment.apiUrl;
  userSub!: Subscription;

  constructor(private store: Store<AppState>) {
    this.cocktails = store.select(state => state.cocktails.cocktails);
    this.cocktails.subscribe(i => {
      console.log(i)
    })
    this.loading = store.select(state => state.cocktails.fetchLoading);
    this.user = store.select(state => state.users.user);
    this.userSub = this.user.subscribe(user => {
      this.userId = <string>user?._id;
    })
  }

  ngOnInit() {
    this.store.dispatch(fetchCocktailsUserRequest({userId: this.userId}));
  }

  onPublish(id: string) {
    const cocktailPublish: CocktailPublish = {
      isPublished: true,
    }

    this.store.dispatch(publishCocktailRequest({cocktailPublish: cocktailPublish, id: id}));
  }

  onRemove(id: string) {
    this.store.dispatch(removeCocktailsRequest({id: id}));
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
