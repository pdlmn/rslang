import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { gamesReducer } from './gamesReducer';
import { gameWordsReducer } from './gameWordsReducer';
import { signInReducer } from './signInReducer';
import { signUpReducer } from './signUpReducer';

export const rootReducer = combineReducers({
  signIn: signInReducer,
  signUp: signUpReducer,
  auth: authReducer,
  games: gamesReducer,
  gameWords: gameWordsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
