export enum SignUpActionTypes {
  Change = 'signUp/change',
  Submit = 'signUp/submit',
  Success = 'sugnUp/success',
  Fail = 'signUp/fail',
  Reset = 'signUp/reset',
}

export type SignUpForm = {
  name: string,
  email: string,
  password1: string,
  password2: string,
};

export type SignUpError = {
  emailAlreadyExists: boolean,
  emailInvalid: boolean,
  passwordInvalid: boolean,
  nameEmpty: boolean,
  emailEmpty: boolean,
  passwordEmpty: boolean,
  other: boolean,
};

export type SignUpState = SignUpForm & {
  submitted: boolean,
  loading: boolean,
  success: boolean,
  error: null | Partial<SignUpError>
};

export type SignUpChangeAction = {
  type: SignUpActionTypes.Change,
  payload: Partial<SignUpForm>,
};

export type SignUpSubmitAction = {
  type: SignUpActionTypes.Submit,
};

export type SignUpSuccessAction = {
  type: SignUpActionTypes.Success,
};

export type SignUpFailAction = {
  type: SignUpActionTypes.Fail,
  payload: Partial<SignUpError>,
};

export type SignUpResetAction = {
  type: SignUpActionTypes.Reset,
};

export type SignUpAction = SignUpChangeAction
| SignUpSubmitAction
| SignUpSuccessAction
| SignUpFailAction
| SignUpResetAction;
