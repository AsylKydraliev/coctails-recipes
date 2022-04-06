import { LoginError, RegisterError, User } from '../models/user.model';

export type UserState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
  fbLoading: boolean,
  googleLoading: boolean,
};

export type AppState = {
  users: UserState,
};


