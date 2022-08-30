import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { signInReducer } from './signInReducer';
import { signUpReducer } from './signUpReducer';

export const rootReducer = combineReducers({
  signIn: signInReducer,
  signUp: signUpReducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
