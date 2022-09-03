import { Word } from '../../interfaces/services';
import { groupButtonData, GroupButtonData } from './groupButtonData';
import {
  REMOVE_COMPLEX_WORD,
  REMOVE_LEARNED_WORD,
  SET_COMPLEX_WORD,
  SET_COMPLEX_WORDS,
  SET_CURRENT_PAGE_WORDS,
  SET_GROUP,
  SET_LEARNED_WORD,
  SET_LEARNED_WORDS,
  SET_PAGE,
  SET_SELECTED_WORD,
  SET_SHOW_COMPLEX_WORDS,
  SET_SHOW_LEARNED_WORDS,
  TextbookAction,
} from './textbook.actions';

export type TextbookState = {
  group: GroupButtonData;
  page: number;
  selectedWord: Word | undefined;
  complexWords: Array<Word>;
  learnedWords: Array<Word>;
  showComplexWords: boolean;
  showLearnedWords: boolean;
  currentPageWords: Array<Word>;
};

const defaultState: TextbookState = {
  group: groupButtonData[0],
  page: 1,
  selectedWord: undefined,
  complexWords: [],
  learnedWords: [],
  showComplexWords: false,
  showLearnedWords: false,
  currentPageWords: [],
};

export const textbookReducer = (
  state = defaultState,
  { type, payload }: TextbookAction,
): TextbookState => {
  switch (type) {
    case SET_CURRENT_PAGE_WORDS: {
      const wordOnCurrentPage = (payload as Array<Word>)
        .find((w) => w.id === state?.selectedWord?.id);

      return {
        ...state,
        currentPageWords: payload as Array<Word>,
        selectedWord: wordOnCurrentPage || (payload as Array<Word>)[0],
      };
    }
    case SET_GROUP:
      return {
        ...state,
        page: 1,
        group: payload as GroupButtonData,
      };
    case SET_PAGE:
      return { ...state, page: (payload as number) };
    case SET_SELECTED_WORD:
      return { ...state, selectedWord: payload as Word };
    case SET_COMPLEX_WORD:
      if (state.complexWords.find((el) => el.id === (payload as Word)?.id)) {
        return state;
      }
      return { ...state, complexWords: [...state.complexWords, payload as Word] };
    case SET_COMPLEX_WORDS:
        return { ...state, complexWords: (payload as Array<Word>) };
    case REMOVE_COMPLEX_WORD:
      return {
        ...state,
        complexWords: [
          ...state.complexWords.filter((el) => el.id !== (payload as Word)?.id),
        ],
      };
    case SET_LEARNED_WORD:
      if (state.learnedWords.find((el) => el.id === (payload as Word)?.id)) {
        return state;
      }
      return { ...state, learnedWords: [...state.learnedWords, payload as Word] };
    case SET_LEARNED_WORDS:
        return { ...state, learnedWords: payload as Array<Word> };
    case REMOVE_LEARNED_WORD:
      return {
        ...state,
        learnedWords: [
          ...state.learnedWords.filter((el) => el.id !== (payload as Word)?.id),
        ],
      };
    case SET_SHOW_COMPLEX_WORDS:
      return { ...state, showComplexWords: (payload as boolean) };
    case SET_SHOW_LEARNED_WORDS:
      return { ...state, showLearnedWords: (payload as boolean) };
    default:
      return state;
  }
};
