import { Word } from '../../interfaces/services';
import { GroupButtonData } from './groupButtonData';

// SET_GROUP
export const SET_GROUP = 'SET_GROUP';

export type SetGroupAction = {
  type: string;
  payload: GroupButtonData;
};

export const setGroup = (group: GroupButtonData) => ({
  type: SET_GROUP,
  payload: group,
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

export type TextbookAction =
  | SetGroupAction
  | SetSelectedWordAction
  | SetComplexWordAction
  | SetLearnedWordAction;
