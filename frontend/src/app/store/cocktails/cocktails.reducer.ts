import { CocktailState } from '../types';
import { createReducer, on } from '@ngrx/store';
import {
  createCocktailFailure,
  createCocktailRequest,
  createCocktailSuccess, fetchCocktailInfoFailure, fetchCocktailInfoRequest, fetchCocktailInfoSuccess,
  fetchCocktailsFailure,
  fetchCocktailsRequest,
  fetchCocktailsSuccess,
  fetchCocktailsUserFailure,
  fetchCocktailsUserRequest,
  fetchCocktailsUserSuccess,
  publishCocktailRequest, publishCocktailSuccess, removeCocktailsRequest, removeCocktailsSuccess
} from './cocktails.actions';

const initialState: CocktailState = {
  cocktails: [],
  cocktail: null,
  fetchLoading: false,
  fetchError: null,
  createLoading: false,
  createError: null,
  publishLoading: false,
  removeLoading: false,
}
export const cocktailsReducer = createReducer(
  initialState,
  on(fetchCocktailsRequest, state => ({...state, fetchLoading: true})),
  on(fetchCocktailsSuccess, (state, {cocktails}) => ({...state, fetchLoading: false, cocktails})),
  on(fetchCocktailsFailure, (state, {error}) => ({...state, fetchLoading: true, fetchError: error})),

  on(fetchCocktailInfoRequest, state => ({...state, fetchLoading: true})),
  on(fetchCocktailInfoSuccess, (state, {cocktail}) => ({...state, fetchLoading: false, cocktail})),
  on(fetchCocktailInfoFailure, (state, {error}) => ({...state, fetchLoading: true, fetchError: error})),

  on(fetchCocktailsUserRequest, state => ({...state, fetchLoading: true})),
  on(fetchCocktailsUserSuccess, (state, {cocktails}) => ({...state, fetchLoading: false, cocktails})),
  on(fetchCocktailsUserFailure, (state, {error}) => ({...state, fetchLoading: true, fetchError: error})),

  on(createCocktailRequest, state => ({...state, createLoading: true})),
  on(createCocktailSuccess, state => ({...state, createLoading: false})),
  on(createCocktailFailure, (state, {error}) => ({...state, createLoading: false, createError: error})),

  on(publishCocktailRequest, state => ({...state, publishLoading: true})),
  on(publishCocktailSuccess, state => ({...state, publishLoading: false})),

  on(removeCocktailsRequest, (state, {id}) => {
    const update = state.cocktails.filter(cocktail => {
      return cocktail._id !== id;
    });

    return {...state, cocktails: update, removeLoading: true}
  }),
  on(removeCocktailsSuccess, state => ({...state, publishLoading: false})),
)
