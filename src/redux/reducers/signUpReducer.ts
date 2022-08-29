import { SignUpAction, SignUpActionTypes, SignUpState } from '../../interfaces/redux/signUp';

const initialState: SignUpState = {
  name: '',
  email: '',
  password1: '',
  password2: '',
  loading: false,
  success: false,
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
        ...state, error: null, loading: false, success: true, submitted: true,
      };
    case SignUpActionTypes.Fail:
      return {
        ...state, error: action.payload, loading: false, success: false, submitted: true,
      };
    case SignUpActionTypes.Reset:
      return { ...initialState };
    default:
      return state;
  }
};
