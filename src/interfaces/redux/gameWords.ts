import { WordInfo } from '../gameWords';

export enum GameWordsActionTypes {
  SetWords = 'gameWords/setWords',
  NextWord = 'gameWords/nextWord',
  PrevWord = 'gameWords/prevWord',
  RightAnswer = 'gameWords/rightAnswer',
  WrongAnswer = 'gameWords/wrongAnswer',
}

export interface GameWordsState {
  words: Array<WordInfo>,
  currentWordIndex: number,
  correctAnswersRow: number,
  correctAnswersRowMax: number,
}

export type SetWordsAction = ({
  type: GameWordsActionTypes.SetWords,
  payload: Array<WordInfo>
});

export type NextWordAction = ({
  type: GameWordsActionTypes.NextWord,
});

export type PrevWordAction = ({
  type: GameWordsActionTypes.PrevWord,
});

export type RightAnswerAction = ({
  type: GameWordsActionTypes.RightAnswer,
});

export type WrongAnswerAction = ({
  type: GameWordsActionTypes.WrongAnswer,
});

export type GameWordsActions =
SetWordsAction |
NextWordAction | PrevWordAction |
RightAnswerAction | WrongAnswerAction;
