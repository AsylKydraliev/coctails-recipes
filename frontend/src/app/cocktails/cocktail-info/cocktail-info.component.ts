import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable, Subscription } from 'rxjs';
import { Cocktail } from '../../models/cocktail.model';
import { fetchCocktailInfoRequest } from '../../store/cocktails/cocktails.actions';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-cocktail-info',
  templateUrl: './cocktail-info.component.html',
  styleUrls: ['./cocktail-info.component.sass']
})
export class CocktailInfoComponent implements OnInit, OnDestroy {
  cocktail: Observable<Cocktail | null>;
  cocktailSub!: Subscription;
  infoCocktail!: Cocktail | null;
  api = environment.apiUrl;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.cocktail = store.select(state => state.cocktails.cocktail);
    this.cocktailSub = this.cocktail.subscribe(cocktail => {
      this.infoCocktail = cocktail;
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.store.dispatch(fetchCocktailInfoRequest({id: params['id']}));
    })
  }

  ngOnDestroy() {
    this.cocktailSub.unsubscribe();
  }
}
