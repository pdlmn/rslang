import { Middleware } from 'redux';
import { AuthAction, AuthActionTypes } from '../../interfaces/redux/auth';

export const saveUserToStorage: Middleware = (
  () => (next) => (action: AuthAction) => {
    if (action.type === AuthActionTypes.LogIn) {
      const user = action.payload;
      localStorage.setItem('user', JSON.stringify(user));
    }

    return next(action);
  }
);

export const deleteUserFromStorage: Middleware = (
  () => (next) => (action: AuthAction) => {
    if (action.type === AuthActionTypes.LogOut) {
      localStorage.removeItem('user');
    }

    return next(action);
  }
);

export const refreshUserInStorage: Middleware = (
  () => (next) => (action: AuthAction) => {
    if (action.type === AuthActionTypes.Refresh) {
      const user = localStorage.getItem('user');
      if (user) {
        const refreshedUser = { ...JSON.parse(user), ...action.payload };
        localStorage.setItem('user', JSON.stringify(refreshedUser));
      }
    }

    return next(action);
  }
);
