import { UserState } from '../types';
import { createReducer, on } from '@ngrx/store';
import {
  loginFbFailure,
  loginFbRequest, loginFbSuccess, loginGoogleFailure, loginGoogleRequest, loginGoogleSuccess,
  loginUsersFailure,
  loginUsersRequest,
  loginUsersSuccess, logoutUser,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess
} from './users.actions';

const initialState: UserState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  fbLoading: false,
  googleLoading: false
}

export const usersReducer = createReducer(
  initialState,
  on(registerUserRequest, state => ({...state, registerLoading: true, registerError: null})),
  on(registerUserSuccess, (state, {user}) => ({...state, registerLoading: false, user})),
  on(registerUserFailure, (state, {error}) => ({...state, registerLoading: false, registerError: error})),

  on(loginUsersRequest, state => ({...state, loginLoading: true, loginError: null})),
  on(loginUsersSuccess, (state, {user}) => ({...state, loginLoading: false, user})),
  on(loginUsersFailure, (state, {error}) => ({...state, loginLoading: false, loginError: error})),

  on(loginFbRequest, state => ({...state, fbLoading: true, loginError: null})),
  on(loginFbSuccess, (state, {user}) => ({...state, fbLoading: false, user})),
  on(loginFbFailure, (state, {error}) => ({...state, fbLoading: false, loginError: error})),

  on(loginGoogleRequest, state => ({...state, googleLoading: true, loginError: null})),
  on(loginGoogleSuccess, (state, {user}) => ({...state, googleLoading: false, user})),
  on(loginGoogleFailure, (state, {error}) => ({...state, googleLoading: false, loginError: error})),

  on(logoutUser, state => ({...state, user: null})),
)
