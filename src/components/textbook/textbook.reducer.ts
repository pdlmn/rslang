import { Word } from '../../interfaces/services';
import { groupButtonData, GroupButtonData } from './groupButtonData';
import {
  SET_GROUP,
  SET_SELECTED_WORD,
  TextbookAction,
} from './textbook.actions';

export type TextbookState = {
  group?: GroupButtonData;
  selectedWord: Word | undefined;
};

const defaultState: TextbookState = {
  group: groupButtonData[0],
  selectedWord: undefined,
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
    default:
      return state;
  }
};
