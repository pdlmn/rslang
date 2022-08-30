import { Word } from '../../interfaces/services';
import { groupButtonData, GroupButtonData } from './groupButtonData';
import {
  SET_COMPLEX_WORD,
  SET_GROUP,
  SET_LEARNED_WORD,
  SET_SELECTED_WORD,
  TextbookAction,
} from './textbook.actions';

export type TextbookState = {
  group?: GroupButtonData;
  selectedWord: Word | undefined;
  complexWords: Array<Word>;
  learnedWords: Array<Word>;
};

const defaultState: TextbookState = {
  group: groupButtonData[0],
  selectedWord: undefined,
  complexWords: [],
  learnedWords: [],
};

export const textbookReducer = (
  state = defaultState,
  { type, payload }: Partial<TextbookAction>,
): TextbookState => {
  switch (type) {
    case SET_GROUP:
      return { ...state, group: payload as GroupButtonData };
    case SET_SELECTED_WORD:
      return { ...state, selectedWord: payload as Word };
    case SET_COMPLEX_WORD:
      return { ...state, complexWords: [...state.complexWords, payload as Word] };
    case SET_LEARNED_WORD:
      return { ...state, learnedWords: [...state.learnedWords, payload as Word] };
    default:
      return state;
  }
};
