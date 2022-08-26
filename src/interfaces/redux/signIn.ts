export enum SignInActionTypes {
  Change = 'signIn/change',
}

export type SignInState = {
  email: string,
  password: string,
};

type SignInChangeAction = {
  type: SignInActionTypes.Change
  payload: Partial<SignInState>,
};

export type SignInAction = SignInChangeAction;
