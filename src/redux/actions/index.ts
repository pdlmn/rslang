import * as signInActions from './signInActions';
import * as signUpActions from './signUpActions';
import * as gamesActions from './gamesActions';
import * as gameWordsActions from './gameWordsActions';

export default {
  ...signInActions,
  ...signUpActions,
  ...gamesActions,
  ...gameWordsActions,
};
