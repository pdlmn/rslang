import { RootState } from '../../redux/reducers';

export const getGroup = (state: RootState) => state.textbook.group;

export const getSelectedWord = (state: RootState) => state.textbook.selectedWord;

export const getComplexWords = (state: RootState) => state.textbook.complexWords;

export const getLearnedWords = (state: RootState) => state.textbook.learnedWords;
