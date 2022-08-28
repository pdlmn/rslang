import { combineReducers } from 'redux';
import { textbookReducer } from '../../components/textbook/textbook.reducer';
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
  textbook: textbookReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
