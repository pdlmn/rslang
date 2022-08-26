import { Dispatch } from 'redux';
import {
  SignUpActionTypes, SignUpChangeAction, SignUpState, SignUpFailAction, SignUpAction,
} from '../../interfaces/redux/signUp';

export const signUpChange = (payload: Partial<SignUpState>): SignUpChangeAction => ({
  type: SignUpActionTypes.Change,
  payload,
});

export const signUpFail = (payload: boolean): SignUpFailAction => ({
  type: SignUpActionTypes.Fail,
  payload,
});

export const signUpSubmit = () => (
  async (dispatch: Dispatch<SignUpAction>) => {
    try {
      dispatch({ type: SignUpActionTypes.Submit });
      await new Promise((_, reject) => {
        setTimeout(() => { reject(); }, 2000);
      });
    } catch (e) {
      dispatch(signUpFail(true));
    }
  }
);
