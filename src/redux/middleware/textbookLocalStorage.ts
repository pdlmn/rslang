import { Middleware } from 'redux';
import {
  SET_GROUP,
  SET_PAGE,
  SET_SHOW_COMPLEX_WORDS,
  SET_SHOW_LEARNED_WORDS,
  TextbookAction,
} from '../../components/textbook/textbook.actions';

export const saveTextbookStateInStorage: Middleware = (
  () => (next) => ({ type, payload }: TextbookAction) => {
    const textbookStateString = localStorage.getItem('textbookState');
    const textbookState = textbookStateString ? JSON.parse(textbookStateString) : {};

    if (type === SET_GROUP) {
      localStorage.setItem('textbookState', JSON.stringify({ ...textbookState, group: payload }));
    }
    if (type === SET_PAGE) {
      localStorage.setItem('textbookState', JSON.stringify({ ...textbookState, page: payload }));
    }
    if (type === SET_SHOW_COMPLEX_WORDS) {
      localStorage.setItem('textbookState', JSON.stringify({ ...textbookState, showComplexWords: payload }));
    }
    if (type === SET_SHOW_LEARNED_WORDS) {
      localStorage.setItem('textbookState', JSON.stringify({ ...textbookState, showLearnedWords: payload }));
    }
    return next({ type, payload });
  }
);
