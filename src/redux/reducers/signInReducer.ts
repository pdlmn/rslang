import { SignInAction, SignInActionTypes, SignInState } from '../../interfaces/redux/signIn';

const initialState: SignInState = {
  email: '',
  password: '',
  loading: false,
  failed: false,
};

export const signInReducer = (state = initialState, action: SignInAction) => {
  switch (action.type) {
    case SignInActionTypes.Change:
      return { ...state, ...action.payload };
    case SignInActionTypes.Submit:
      return { ...state, loading: true };
    case SignInActionTypes.Fail:
      return { ...state, loading: false, failed: action.payload };
    default:
      return state;
  }
};
