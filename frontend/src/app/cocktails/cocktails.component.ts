import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { Observable } from 'rxjs';
import { Cocktail, CocktailPublish } from '../models/cocktail.model';
import {
  fetchCocktailsRequest,
  publishCocktailRequest,
  removeCocktailsRequest
} from '../store/cocktails/cocktails.actions';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.sass']
})
export class CocktailsComponent implements OnInit {
  api = environment.apiUrl;
  cocktails: Observable<Cocktail[]>;
  loading: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.cocktails = store.select(state => state.cocktails.cocktails);
    this.loading = store.select(state => state.cocktails.fetchLoading);
  }

  ngOnInit() {
    this.store.dispatch(fetchCocktailsRequest());
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
}
