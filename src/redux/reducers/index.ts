import { combineReducers } from 'redux';
import { textbookReducer } from '../../components/textbook/textbook.reducer';
import { authReducer } from './auth';
import { gamesReducer } from './gamesReducer';
import { signInReducer } from './signInReducer';
import { signUpReducer } from './signUpReducer';
import { statisticsReducer } from './statistics';

export const rootReducer = combineReducers({
  signIn: signInReducer,
  signUp: signUpReducer,
  auth: authReducer,
  textbook: textbookReducer,
  games: gamesReducer,
  statistics: statisticsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
