import { combineReducers } from 'redux';
import { signInReducer } from './signInReducer';
import { signUpReducer } from './signUpReducer';

export const rootReducer = combineReducers({
  signIn: signInReducer,
  signUp: signUpReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
