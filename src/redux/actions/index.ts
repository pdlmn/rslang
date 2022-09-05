import * as signInActions from './signInActions';
import * as signUpActions from './signUpActions';
import * as gamesActions from './gamesActions';

export default {
  ...signInActions,
  ...signUpActions,
  ...gamesActions,
};
