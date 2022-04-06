import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import { Observable } from 'rxjs';
import { Cocktail } from '../models/cocktail.model';
import { fetchCocktailsRequest } from '../store/cocktails/cocktails.actions';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.sass']
})
export class CocktailsComponent implements OnInit {
  api = environment.apiUrl;
  cocktails: Observable<Cocktail[]>;

  constructor(private store: Store<AppState>) {
    this.cocktails = store.select(state => state.cocktails.cocktails);
  }

  ngOnInit() {
    this.store.dispatch(fetchCocktailsRequest());
  }
}
