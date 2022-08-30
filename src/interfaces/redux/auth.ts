import { Token, UserToken } from '../services';

export enum AuthActionTypes {
  LogIn = 'auth/logIn',
  LogOut = 'auth/logOut',
  Refresh = 'auth/refresh',
}

export type UserAuthData = UserToken & { lastLogin: number };

export type AuthState = {
  user: null | UserAuthData,
};

export type AuthLogInAction = {
  type: AuthActionTypes.LogIn,
  payload: UserAuthData,
};

export type AuthLogOutAction = {
  type: AuthActionTypes.LogOut;
};

export type AuthRefreshAction = {
  type: AuthActionTypes.Refresh;
  payload: Token & { lastLogin: number };
};

export type AuthAction = AuthLogInAction | AuthLogOutAction | AuthRefreshAction;
