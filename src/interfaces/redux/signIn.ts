export enum SignInActionTypes {
  Change = 'signIn/change',
  Submit = 'signIn/sumbit',
  Success = 'signIn/success',
  Fail = 'signIn/fail',
  Reset = 'signIn/reset',
}

export type SignInForm = {
  email: string,
  password: string,
};

export type SignInError = {
  incorrectEmailOrPassword: boolean,
  other: boolean,
};

export type SignInState = SignInForm & {
  loading: boolean,
  success: boolean,
  error: null | Partial<SignInError>,
};

export type SignInChangeAction = {
  type: SignInActionTypes.Change,
  payload: Partial<Pick<SignInState, 'email' | 'password'>>,
};

export type SignInSubmitAction = {
  type: SignInActionTypes.Submit,
};

export type SignInSuccessAction = {
  type: SignInActionTypes.Success,
};

export type SignInFailAction = {
  type: SignInActionTypes.Fail,
  payload: Partial<SignInError>,
};

export type SignInResetAction = {
  type: SignInActionTypes.Reset,
};

export type SignInAction = SignInChangeAction
| SignInSubmitAction
| SignInSuccessAction
| SignInFailAction
| SignInResetAction;
