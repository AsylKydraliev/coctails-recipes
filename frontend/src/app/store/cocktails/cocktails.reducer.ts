import { CocktailState } from '../types';
import { createReducer, on } from '@ngrx/store';
import {
  createCocktailFailure,
  createCocktailRequest, createCocktailSuccess,
  fetchCocktailsFailure,
  fetchCocktailsRequest,
  fetchCocktailsSuccess
} from './cocktails.actions';

const initialState: CocktailState = {
  cocktails: [],
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

  on(createCocktailRequest, state => ({...state, createLoading: true})),
  on(createCocktailSuccess, state => ({...state, createLoading: false})),
  on(createCocktailFailure, (state, {error}) => ({...state, createLoading: false, createError: error})),

  // on(publishAlbumRequest, state => ({...state, publishLoading: true})),
  // on(publishAlbumSuccess, state => ({...state, publishLoading: false})),

  // on(removeAlbumRequest, (state, {id}) => {
  //   const updateAlbum = state.albums.filter(album => {
  //     return album._id !== id;
  //   });
  //
  //   return {...state, albums: updateAlbum, removeLoading: true}
  // }),
  // on(removeAlbumSuccess, state => ({...state, publishLoading: false})),
)
