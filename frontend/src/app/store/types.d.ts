import { LoginError, RegisterError, User } from '../models/user.model';
import { Cocktail } from '../models/cocktail.model';

export type UserState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
  fbLoading: boolean,
};

export type CocktailState = {
  cocktails: Cocktail[],
  fetchLoading: boolean,
  fetchError: string | null,
  createLoading: boolean,
  createError: null | string,
  publishLoading: boolean,
  removeLoading: boolean
}

export type AppState = {
  users: UserState,
  cocktails: CocktailState
};


