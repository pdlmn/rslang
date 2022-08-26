import { SignUpAction, SignUpActionTypes, SignUpState } from '../../interfaces/redux/signUp';

const initialState: SignUpState = {
  name: '',
  email: '',
  password1: '',
  password2: '',
  loading: false,
  failed: false,
};

export const signUpReducer = (state = initialState, action: SignUpAction) => {
  switch (action.type) {
    case SignUpActionTypes.Change:
      return { ...state, ...action.payload };
    case SignUpActionTypes.Submit:
      return { ...state, loading: true };
    case SignUpActionTypes.Fail:
      return { ...state, loading: false, failed: action.payload };
    default:
      return state;
  }
};
