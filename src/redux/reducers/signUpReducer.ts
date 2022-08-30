import { SignUpAction, SignUpActionTypes, SignUpState } from '../../interfaces/redux/signUp';

const initialState: SignUpState = {
  name: '',
  email: '',
  password1: '',
  password2: '',
  loading: false,
  user: null,
  submitted: false,
  error: null,
};

export const signUpReducer = (state = initialState, action: SignUpAction): SignUpState => {
  switch (action.type) {
    case SignUpActionTypes.Change:
      return { ...state, ...action.payload };
    case SignUpActionTypes.Submit:
      return { ...state, loading: true };
    case SignUpActionTypes.Success:
      return {
        ...state, error: null, loading: false, user: action.payload, submitted: true,
      };
    case SignUpActionTypes.Fail:
      return {
        ...state, error: action.payload, loading: false, user: null, submitted: true,
      };
    case SignUpActionTypes.Reset:
      return { ...initialState };
    default:
      return state;
  }
};
