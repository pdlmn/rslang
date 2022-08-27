export enum SignInActionTypes {
  Change = 'signIn/change',
  Submit = 'signIn/sumbit',
  Fail = 'signIn/fail',
}

export type SignInState = {
  email: string,
  password: string,
  loading: boolean,
  failed: boolean,
};

export type SignInChangeAction = {
  type: SignInActionTypes.Change,
  payload: Partial<SignInState>,
};

export type SignInSubmitAction = {
  type: SignInActionTypes.Submit,
};

export type SignInFailAction = {
  type: SignInActionTypes.Fail,
  payload: boolean,
};

export type SignInAction = SignInChangeAction | SignInSubmitAction | SignInFailAction;
