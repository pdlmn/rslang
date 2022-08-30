import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { rootReducer, RootState } from './reducers';
import { deleteUserFromStorage, refreshUserInStorage, saveUserToStorage } from './middleware/authLocalStorage';
import { authLogIn } from './actions/auth';
import { UserAuthData } from '../interfaces/redux/auth';

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk, saveUserToStorage, deleteUserFromStorage, refreshUserInStorage),
);

const userString = localStorage.getItem('user');
if (userString) {
  const user = JSON.parse(userString) as UserAuthData;
  store.dispatch(authLogIn(user));
}

type PermitedActions = ReturnType<typeof store.dispatch>;
type AppDispatch = ThunkDispatch<RootState, any, PermitedActions>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
