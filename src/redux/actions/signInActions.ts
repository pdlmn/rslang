import { Dispatch } from 'redux';
import {
  SignInAction,
  SignInActionTypes, SignInChangeAction, SignInFailAction, SignInState,
} from '../../interfaces/redux/signIn';

export const signInChange = (payload: Partial<SignInState>): SignInChangeAction => ({
  type: SignInActionTypes.Change,
  payload,
});

export const signInFail = (payload: boolean): SignInFailAction => ({
  type: SignInActionTypes.Fail,
  payload,
});

export const signInSubmit = () => (
  async (dispatch: Dispatch<SignInAction>) => {
    try {
      dispatch({ type: SignInActionTypes.Submit });
      await new Promise((_, reject) => {
        setTimeout(() => { reject(); }, 2000);
      });
    } catch (e) {
      dispatch(signInFail(true));
    }
  }
);
