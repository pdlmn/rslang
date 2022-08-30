import { Dispatch } from 'redux';
import {
  SignInAction,
  SignInActionTypes,
  SignInChangeAction,
  SignInError,
  SignInFailAction,
  SignInForm,
  SignInResetAction,
  SignInState,
  SignInSuccessAction,
} from '../../interfaces/redux/signIn';
import { UserToken } from '../../interfaces/services';
import Users from '../../services/users';

export const signInChange = (payload: Partial<SignInState>): SignInChangeAction => ({
  type: SignInActionTypes.Change,
  payload,
});

export const signInSuccess = (payload: UserToken): SignInSuccessAction => ({
  type: SignInActionTypes.Success,
  payload,
});

export const signInFail = (payload: Partial<SignInError>): SignInFailAction => ({
  type: SignInActionTypes.Fail,
  payload,
});

export const signInReset = (): SignInResetAction => ({
  type: SignInActionTypes.Reset,
});

export const signInSubmit = (payload: SignInForm) => (
  async (dispatch: Dispatch<SignInAction>) => {
    try {
      dispatch({ type: SignInActionTypes.Submit });
      const response = await Users.signIn(payload.email, payload.password);
      if ('token' in response) {
        dispatch(signInSuccess(response));
      } else if (response.status === 404 || response.status === 403) {
        dispatch(signInFail({ incorrectEmailOrPassword: true }));
      }
    } catch (e) {
      dispatch(signInFail({ other: true }));
    }
  }
);
