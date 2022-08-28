import { Word } from '../../interfaces/services';
import { GroupButtonData } from './groupButtonData';

export const SET_GROUP = 'SET_GROUP';

export type SetGroupAction = {
  type: string,
  payload: GroupButtonData,
};

export const setGroup = (group: GroupButtonData) => ({
  type: SET_GROUP,
  payload: group,
});

export const SET_SELECTED_WORD = 'SET_SELECTED_WORD';

export type SetSelectedWordAction = {
  type: string,
  payload: Word | undefined,
};

export const setSelectedWord = (selectedWord: Word) => ({
  type: SET_SELECTED_WORD,
  payload: selectedWord,
});

export type TextbookAction = SetGroupAction | SetSelectedWordAction;
