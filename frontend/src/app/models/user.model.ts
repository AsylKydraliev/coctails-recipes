export interface User {
  _id: string,
  email: string,
  displayName: string,
  avatar: File | null,
  token: string,
  role: string,
}

export interface RegisterUser {
  email: string,
  displayName: string,
  password: string,
  avatar: File | null
}

export interface LoginUserData {
  email: string,
  password: string
}

export interface fbLoginUserData {
  authToken: string,
  id: string,
  email: string,
  name: string,
  avatar: string
}

export interface googleLoginUserData {
  authToken: string,
  id: string,
  email: string,
  name: string,
  avatar: string,
  accessToken: string
}

export interface FieldError {
  message: string
}

export interface  RegisterError {
  errors: {
    password: FieldError,
    email: FieldError,
    displayName: FieldError
  }
}

export interface LoginError {
  error: string
}
