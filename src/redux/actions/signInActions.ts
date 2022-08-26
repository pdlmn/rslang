import { SignInActionTypes, SignInState } from '../../interfaces/redux/signIn';

export const signInChange = (payload: Partial<SignInState>) => ({
  type: SignInActionTypes.Change,
  payload,
});
