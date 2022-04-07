import { createAction, props } from '@ngrx/store';
import { Cocktail, CocktailData, CocktailPublish } from '../../models/cocktail.model';

export const fetchCocktailsRequest = createAction(
  '[Cocktails] Fetch Request'
);
export const fetchCocktailsSuccess = createAction(
  '[Cocktails] Fetch Success',
  props<{cocktails: Cocktail[]}>()
);
export const fetchCocktailsFailure = createAction(
  '[Cocktails] Fetch Failure',
  props<{error: string}>()
);


export const fetchCocktailsUserRequest = createAction(
  '[CocktailsUser] Fetch Request',
   props<{userId: string}>()
);
export const fetchCocktailsUserSuccess = createAction(
  '[CocktailsUser] Fetch Success',
  props<{cocktails: Cocktail[]}>()
);
export const fetchCocktailsUserFailure = createAction(
  '[CocktailsUser] Fetch Failure',
  props<{error: string}>()
);


export const createCocktailRequest = createAction(
  '[Cocktail] Create Request',
  props<{cocktailData: CocktailData}>()
);
export const createCocktailSuccess = createAction(
  '[Cocktail] Create Success'
);
export const createCocktailFailure = createAction(
  '[Cocktail] Create Failure',
  props<{error: string | null}>()
);

export const publishCocktailRequest = createAction('[Cocktail] Publish Request',
  props<{cocktailPublish: CocktailPublish, id: string}>());
export const publishCocktailSuccess = createAction('[Cocktail] Publish Success');

export const removeCocktailsRequest = createAction('[Cocktail] Remove Request',
  props<{id: string}>());
export const removeCocktailsSuccess = createAction('[Cocktail] Remove Success');
