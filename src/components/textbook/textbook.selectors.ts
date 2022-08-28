import { RootState } from '../../redux/reducers';

export const getGroup = (state: RootState) => state.textbook.group;

export const getSelectedWord = (state: RootState) => state.textbook.selectedWord;
