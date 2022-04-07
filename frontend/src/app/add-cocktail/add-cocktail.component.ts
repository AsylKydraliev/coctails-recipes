import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../store/types';
import {
  createCocktailRequest,
  publishCocktailRequest,
  removeCocktailsRequest
} from '../store/cocktails/cocktails.actions';
import { User } from '../models/user.model';
import { CocktailPublish } from '../models/cocktail.model';

@Component({
  selector: 'app-add-cocktail',
  templateUrl: './add-cocktail.component.html',
  styleUrls: ['./add-cocktail.component.sass']
})
export class AddCocktailComponent implements OnInit, OnDestroy {
  createForm!: FormGroup;
  loading: Observable<boolean>;
  user: Observable<User | null>;
  error: Observable<null | string>;
  userId!: string;
  addButtonDisabled = false;
  userSub!: Subscription;

  constructor(private store: Store<AppState>) {
    this.loading = store.select(state => state.cocktails.createLoading);
    this.error = store.select(state => state.cocktails.createError);
    this.user = store.select(state => state.users.user);

    this.userSub = this.user.subscribe(user => {
      this.userId = <string>user?._id;
    })
  }

  ngOnInit() {
    this.createForm = new FormGroup({
      title: new FormControl('', Validators.required),
      image: new FormControl(''),
      recipe: new FormControl('', Validators.required),
      ingredients: new FormArray([]),
    })
  }

  onSubmit() {
    const cocktail = this.createForm.value;
    const cocktailData = {
      user: this.userId,
      title: cocktail.title,
      image: cocktail.image,
      recipe: cocktail.recipe,
      ingredients: cocktail.ingredients
    }
    this.store.dispatch(createCocktailRequest({cocktailData: cocktailData}));
  }

  addIngredient() {
    this.addButtonDisabled = true;
    const ingredients = <FormArray>this.createForm.get('ingredients');
    const ingredientsGroup = new FormGroup({
      title: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
    })

    ingredients.push(ingredientsGroup);
  }

  getIngredientControls() {
    const ingredients = <FormArray>this.createForm.get('ingredients');
    return ingredients.controls;
  }

  fieldHasError(fieldName: string, errorType: string) {
    const field = this.createForm.get(fieldName);
    return Boolean(field && field.touched && field.errors?.[errorType]);
  }

  ingredientsHasError(fieldName: string, errorType: string, index: number) {
    const ingredients = <FormArray>this.createForm.get('ingredients');
    const field = ingredients.controls[index].get(fieldName);
    return Boolean(field && field.touched && field.errors?.[errorType]);
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
