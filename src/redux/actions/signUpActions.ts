import { Dispatch } from 'redux';
import {
  SignUpActionTypes,
  SignUpChangeAction,
  SignUpFailAction,
  SignUpAction,
  SignUpSuccessAction,
  SignUpResetAction,
  SignUpForm,
  SignUpError,
} from '../../interfaces/redux/signUp';
import { User, UserCreateErrorResponse, UserToken } from '../../interfaces/services';
import Users from '../../services/users';

export const signUpChange = (payload: Partial<SignUpForm>): SignUpChangeAction => ({
  type: SignUpActionTypes.Change,
  payload,
});

export const signUpSuccess = (payload: UserToken): SignUpSuccessAction => ({
  type: SignUpActionTypes.Success,
  payload,
});

export const signUpFail = (payload: Partial<SignUpError>): SignUpFailAction => ({
  type: SignUpActionTypes.Fail,
  payload,
});

export const signUpReset = (): SignUpResetAction => ({
  type: SignUpActionTypes.Reset,
});

const checkFieldInvalidity = (field: string, message: string) => (
  ({ error }: UserCreateErrorResponse): boolean => {
    const fieldError = error.errors.find((err) => err.path[0] === field);
    if (fieldError) {
      const isfieldInvalid = fieldError.message.includes(message);
      return isfieldInvalid;
    }
    return false;
  }
);

const checkFieldEmptiness = (field: string) => ({ error }: UserCreateErrorResponse): boolean => {
  const fieldError = error.errors.find((err) => err.path[0] === field);
  if (fieldError) {
    const isEmpty = fieldError.message.includes('is not allowed to be empty');
    return isEmpty;
  }
  return false;
};

const checkEmailInvalidity = checkFieldInvalidity('email', 'must be a valid');
const checkPasswordInvalidity = checkFieldInvalidity('password', 'must be at least 8 characters long');

const checkNameEmptiness = checkFieldEmptiness('name');
const checkEmailEmptiness = checkFieldEmptiness('email');
const checkPasswordEmptiness = checkFieldEmptiness('password');

export const signUpSubmit = (payload: Omit<User, 'id'>) => (
  async (dispatch: Dispatch<SignUpAction>) => {
    try {
      dispatch({ type: SignUpActionTypes.Submit });
      const response = await Users.create(payload);

      if ('email' in response) {
        const user = await Users.signIn(payload.email, payload.password) as UserToken;
        dispatch(signUpSuccess(user));
      } else if (response.status === 417) {
        dispatch(signUpFail({ emailAlreadyExists: true }));
      } else if (response.status === 422) {
      // 422 means some fileds are invalid
        const errorObject = await response.json() as UserCreateErrorResponse;

        const isEmailInvalid = checkEmailInvalidity(errorObject);
        const isPasswordInvalid = checkPasswordInvalidity(errorObject);

        const isNameEmpty = checkNameEmptiness(errorObject);
        const isEmailEmpty = checkEmailEmptiness(errorObject);
        const isPasswordEmpty = checkPasswordEmptiness(errorObject);

        dispatch(signUpFail({
          emailInvalid: isEmailInvalid,
          passwordInvalid: isPasswordInvalid,
          nameEmpty: isNameEmpty,
          emailEmpty: isEmailEmpty,
          passwordEmpty: isPasswordEmpty,
        }));
      }
    } catch {
      dispatch(signUpFail({ other: true }));
    }
  }
);
