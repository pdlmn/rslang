import { Word } from '../../interfaces/services';
import { GroupButtonData } from './groupButtonData';

// SET_GROUP
export const SET_GROUP = 'SET_GROUP';

export type SetGroupAction = {
  type: string;
  payload: GroupButtonData;
};

export const setGroup = (group?: GroupButtonData) => ({
  type: SET_GROUP,
  payload: group,
});

// SET_PAGE
export const SET_PAGE = 'SET_PAGE';

export type SetPageAction = {
  type: string;
  payload: number;
};

export const setPage = (page: number) => ({
  type: SET_PAGE,
  payload: page,
});

// SET_SELECTED_WORD
export const SET_SELECTED_WORD = 'SET_SELECTED_WORD';

export type SetSelectedWordAction = {
  type: string;
  payload: Word | undefined;
};

export const setSelectedWord = (selectedWord: Word) => ({
  type: SET_SELECTED_WORD,
  payload: selectedWord,
});

// SET_COMPLEX_WORD
export const SET_COMPLEX_WORD = 'SET_COMPLEX_WORD';

export type SetComplexWordAction = {
  type: string;
  payload: Word;
};

export const setComplexWord = (complexWord: Word) => ({
  type: SET_COMPLEX_WORD,
  payload: complexWord,
});

// REMOVE_COMPLEX_WORD
export const REMOVE_COMPLEX_WORD = 'REMOVE_COMPLEX_WORD';

export type RemoveComplexWordAction = {
  type: string;
  payload: Word;
};

export const removeComplexWord = (complexWord: Word) => ({
  type: REMOVE_COMPLEX_WORD,
  payload: complexWord,
});

// SET_LEARNED_WORD
export const SET_LEARNED_WORD = 'SET_LEARNED_WORD';

export type SetLearnedWordAction = {
  type: string;
  payload: Word;
};

export const setLearnedWord = (learnedWord: Word) => ({
  type: SET_LEARNED_WORD,
  payload: learnedWord,
});

// REMOVE_LEARNED_WORD
export const REMOVE_LEARNED_WORD = 'REMOVE_LEARNED_WORD';

export type RemoveLearnedWordAction = {
  type: string;
  payload: Word;
};

export const removeLearnedWord = (learnedWord: Word) => ({
  type: REMOVE_LEARNED_WORD,
  payload: learnedWord,
});

// SET_SHOW_COMPLEX_WORDS
export const SET_SHOW_COMPLEX_WORDS = 'SET_SHOW_COMPLEX_WORDS';

export type SetShowComplexWordsAction = {
  type: string;
  payload: boolean;
};

export const setShowComplexWords = (showComplexWords: boolean) => ({
  type: SET_SHOW_COMPLEX_WORDS,
  payload: showComplexWords,
});

// SET_SHOW_LEARNED_WORDS
export const SET_SHOW_LEARNED_WORDS = 'SET_SHOW_LEARNED_WORDS';

export type SetShowLearnedWordsAction = {
  type: string;
  payload: boolean;
};

export const setShowLearnedWords = (showLearnedWordsAction: boolean) => ({
  type: SET_SHOW_LEARNED_WORDS,
  payload: showLearnedWordsAction,
});

export type TextbookAction =
  | SetGroupAction
  | SetSelectedWordAction
  | SetComplexWordAction
  | SetLearnedWordAction
  | SetShowComplexWordsAction
  | SetShowLearnedWordsAction
  | SetPageAction
  | RemoveComplexWordAction
  | RemoveLearnedWordAction;
