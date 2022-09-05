import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer, RootState } from './reducers';
import {
  deleteUserFromStorage,
  refreshUserInStorage,
  saveUserToStorage,
} from './middleware/authLocalStorage';
import { saveTextbookStateInStorage } from './middleware/textbookLocalStorage';
import { authLogIn } from './actions/auth';
import { UserAuthData } from '../interfaces/redux/auth';
import {
  setGroup,
  setPage,
  setShowComplexWords,
  setShowLearnedWords,
} from '../components/textbook/textbook.actions';
import { groupButtonData } from '../components/textbook/groupButtonData';

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      saveUserToStorage,
      deleteUserFromStorage,
      refreshUserInStorage,
      saveTextbookStateInStorage,
    ),
  ),
);

const userString = localStorage.getItem('user');
if (userString) {
  const user = JSON.parse(userString) as UserAuthData;
  store.dispatch(authLogIn(user));
}

const textbookStateString = localStorage.getItem('textbookState');
if (textbookStateString) {
  const textbookState = JSON.parse(textbookStateString);
  const storedGroup = groupButtonData.find(
    (el) => textbookState?.group?.id === el.id,
  );
  if (storedGroup) {
    store.dispatch(setGroup(storedGroup));
  }
  if (textbookState.page) {
    store.dispatch(setPage(textbookState.page));
  }
  store.dispatch(setShowComplexWords(textbookState.showComplexWords));
  store.dispatch(setShowLearnedWords(textbookState.showLearnedWords));
}

type PermitedActions = ReturnType<typeof store.dispatch>;
type AppDispatch = ThunkDispatch<RootState, any, PermitedActions>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
