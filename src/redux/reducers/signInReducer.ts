import { SignInAction, SignInActionTypes, SignInState } from '../../interfaces/redux/signIn';

const initialState: SignInState = {
  email: '',
  password: '',
  loading: false,
  success: false,
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
        ...state, error: null, loading: false, success: true,
      };
    case SignInActionTypes.Fail:
      return {
        ...state, error: action.payload, loading: false, success: false,
      };
    case SignInActionTypes.Reset:
      return { ...initialState };
    default:
      return state;
  }
};
