import { AuthAction, AuthActionTypes, AuthState } from '../../interfaces/redux/auth';

const initialState: AuthState = {
  user: null,
};

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LogIn:
      return { user: action.payload };
    case AuthActionTypes.Refresh: {
      const { token, refreshToken, lastLogin } = action.payload;
      if (state.user) {
        return {
          user: {
            ...state.user, lastLogin, token, refreshToken,
          },
        };
      }
      return state;
    }
    case AuthActionTypes.LogOut:
      return { ...initialState };
    default:
      return state;
  }
};
