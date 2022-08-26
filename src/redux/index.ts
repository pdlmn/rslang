import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { rootReducer, RootState } from './reducers';

export const store = createStore(
  rootReducer,
  applyMiddleware(thunk),
);

type PermitedActions = ReturnType<typeof store.dispatch>;
type AppDispatch = ThunkDispatch<RootState, any, PermitedActions>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
