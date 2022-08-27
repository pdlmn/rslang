export enum SignUpActionTypes {
  Change = 'signUp/change',
  Submit = 'signUp/submit',
  Fail = 'signUp/fail',
}

export type SignUpState = {
  name: string,
  email: string,
  password1: string,
  password2: string,
  loading: boolean,
  failed: boolean,
};

export type SignUpChangeAction = {
  type: SignUpActionTypes.Change,
  payload: Partial<SignUpState>,
};

export type SignUpSubmitAction = {
  type: SignUpActionTypes.Submit,
};

export type SignUpFailAction = {
  type: SignUpActionTypes.Fail,
  payload: boolean,
};

export type SignUpAction = SignUpChangeAction | SignUpSubmitAction | SignUpFailAction;
