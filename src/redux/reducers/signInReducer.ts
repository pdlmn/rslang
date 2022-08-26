import { SignInAction, SignInActionTypes, SignInState } from '../../interfaces/redux/signIn';

const initialState: SignInState = {
  email: '',
  password: '',
};

export const signInReducer = (state = initialState, action: SignInAction) => {
  switch (action.type) {
    case SignInActionTypes.Change:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
