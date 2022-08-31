import { RootState } from '../../redux/reducers';

export const getGroup = (state: RootState) => state.textbook.group;

export const getPage = (state: RootState) => state.textbook.page;

export const getSelectedWord = (state: RootState) => state.textbook.selectedWord;

export const getComplexWords = (state: RootState) => state.textbook.complexWords;

export const getLearnedWords = (state: RootState) => state.textbook.learnedWords;

export const getShowComplexWords = (state: RootState) => state.textbook.showComplexWords;

export const getShowLearnedWords = (state: RootState) => state.textbook.showLearnedWords;
