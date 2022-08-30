import { WordInfo } from '../../interfaces/gameWords';
import { GameWordsActionTypes } from '../../interfaces/redux/gameWords';

export const setWords = (payload: { words: Array<WordInfo> }) => ({
  type: GameWordsActionTypes.SetWords,
  payload,
});

export const nextWord = () => ({
  type: GameWordsActionTypes.NextWord,
});

export const prevWord = () => ({
  type: GameWordsActionTypes.PrevWord,
});

export const rightAnswer = () => ({
  type: GameWordsActionTypes.RightAnswer,
});

export const wrongAnswer = () => ({
  type: GameWordsActionTypes.WrongAnswer,
});
