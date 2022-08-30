import {
  AuthActionTypes, AuthLogInAction, AuthLogOutAction, AuthRefreshAction, UserAuthData,
} from '../../interfaces/redux/auth';

export const authLogIn = (payload: UserAuthData): AuthLogInAction => ({
  type: AuthActionTypes.LogIn,
  payload,
});

export const authLogOut = (): AuthLogOutAction => ({
  type: AuthActionTypes.LogOut,
});

export const authRefresh = (payload: AuthRefreshAction['payload']): AuthRefreshAction => ({
  type: AuthActionTypes.Refresh,
  payload,
});
