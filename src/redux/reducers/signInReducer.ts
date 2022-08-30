import { SignInAction, SignInActionTypes, SignInState } from '../../interfaces/redux/signIn';

const initialState: SignInState = {
  email: '',
  password: '',
  loading: false,
  user: null,
  error: null,
};

export const signInReducer = (state = initialState, action: SignInAction): SignInState => {
  switch (action.type) {
    case SignInActionTypes.Change:
      return { ...state, ...action.payload };
    case SignInActionTypes.Submit:
      return { ...state, loading: true };
    case SignInActionTypes.Success:
      return {
        ...state, error: null, loading: false, user: action.payload,
      };
    case SignInActionTypes.Fail:
      return {
        ...state, error: action.payload, loading: false, user: null,
      };
    case SignInActionTypes.Reset:
      return { ...initialState };
    default:
      return state;
  }
};
