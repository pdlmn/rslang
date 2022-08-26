import { bindActionCreators } from 'redux';
import { useAppDispatch } from '../redux';
import actions from '../redux/actions';

export const useAction = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(actions, dispatch);
};
