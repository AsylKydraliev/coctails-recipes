import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable, Subscription } from 'rxjs';
import { Cocktail, Rating } from '../../models/cocktail.model';
import { addRatingRequest, fetchCocktailInfoRequest } from '../../store/cocktails/cocktails.actions';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-cocktail-info',
  templateUrl: './cocktail-info.component.html',
  styleUrls: ['./cocktail-info.component.sass']
})
export class CocktailInfoComponent implements OnInit, OnDestroy {
  cocktail: Observable<Cocktail | null>;
  user: Observable<User | null>;
  cocktailSub!: Subscription;
  userSub!: Subscription;
  infoCocktail!: Cocktail | null;
  api = environment.apiUrl;
  starRating = 0;
  cocktailId!: string;
  userId!: string;
  grade!: number;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.cocktail = store.select(state => state.cocktails.cocktail);
    this.user = store.select(state => state.users.user);
    this.cocktailSub = this.cocktail.subscribe(cocktail => {
      this.infoCocktail = cocktail;
      cocktail?.rating.forEach(grade => {
        this.grade = JSON.parse(grade.grade);
        this.starRating = this.grade;
      })
    })
    this.userSub = this.user.subscribe(user => {
      this.userId = <string>user?._id;
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cocktailId = params['id'];
      this.store.dispatch(fetchCocktailInfoRequest({id: params['id']}));
    })
  }

  onEstimate() {
    const rating: Rating = {
      user: this.userId,
      grade: JSON.stringify(this.starRating)
    }
    this.store.dispatch(addRatingRequest({cocktailRating: rating, id: this.cocktailId}))
  }

  ngOnDestroy() {
    this.cocktailSub.unsubscribe();
  }
}
