import { GameNames, Levels } from '../gamesCommon';
import { WordInfo, WordInfoPlus } from '../gameWords';

export enum GamesActionTypes {
  StartGame = 'games/startGame',
  FinishGame = 'games/finishGame',
  SelectLevel = 'games/selectLevel',
  SelectGame = 'games/selectGame',
  Mute = 'games/mute',
  Unmute = 'games/unmute',
  StartLoading = 'games/startLoading',
  StopLoading = 'games/stopLoading',
  StartFullscreen = 'games/startFullscreen',
  StopFullscreen = 'games/stopFullscreen',
  StartFromTextbook = 'games/startFromTextbook',
  StartFromMenu = 'games/startFromMenu',
  ShowError = 'games/showError',
  ResetError = 'games/resetError',
  SetWords = 'gameWords/setWords',
  NextWord = 'gameWords/nextWord',
  PrevWord = 'gameWords/prevWord',
  RightAnswer = 'gameWords/rightAnswer',
  WrongAnswer = 'gameWords/wrongAnswer',
  ResetGame = '',
}

export interface GamesState {
  name: GameNames | '',
  description: string,
  level: Levels,
  fromTextbook: boolean,
  isMuted: boolean,
  isLoading: boolean,
  isStarted: boolean,
  isFinished: boolean,
  isFullscreen: boolean,
  error: Error | null,
  words: Array<WordInfoPlus>,
  currentWordIndex: number,
  correctAnswersRow: number,
  correctAnswersRowMax: number,
  wordsLearned: number,
}

export type SelectLevelAction = {
  type: GamesActionTypes.SelectLevel,
  payload: { level: Levels },
};

export type SelectGameAction = {
  type: GamesActionTypes.SelectGame,
  payload: { name: GameNames, description: string },
};

export type MuteAction = {
  type: GamesActionTypes.Mute,
};

export type UnmuteAction = {
  type: GamesActionTypes.Unmute,
};

export type StartGameAction = {
  type: GamesActionTypes.StartGame
};

export type FinishGameAction = {
  type: GamesActionTypes.FinishGame
};

export type StartLoadingAction = {
  type: GamesActionTypes.StartLoading
};

export type StopLoadingAction = {
  type: GamesActionTypes.StopLoading
};

export type StartFullscreenAction = {
  type: GamesActionTypes.StartFullscreen
};

export type StopFullscreenAction = {
  type: GamesActionTypes.StopFullscreen
};

export type StartFromTextbookAction = {
  type: GamesActionTypes.StartFromTextbook
};

export type StartFromMenuAction = {
  type: GamesActionTypes.StartFromMenu
};

export type ShowErrorAction = {
  type: GamesActionTypes.ShowError,
  payload: { error: Error }
};

export type ResetErrorAction = {
  type: GamesActionTypes.ResetError
};

export type SetWordsAction = ({
  type: GamesActionTypes.SetWords,
  payload: Array<WordInfo>
});

export type NextWordAction = ({
  type: GamesActionTypes.NextWord,
});

export type PrevWordAction = ({
  type: GamesActionTypes.PrevWord,
});

export type RightAnswerAction = ({
  type: GamesActionTypes.RightAnswer,
});

export type WrongAnswerAction = ({
  type: GamesActionTypes.WrongAnswer,
});

export type ResetGame = ({
  type: GamesActionTypes.ResetGame,
});

export type GamesAction =
SelectLevelAction | SelectGameAction |
MuteAction | UnmuteAction |
StartGameAction | FinishGameAction |
StartLoadingAction | StopLoadingAction |
StartFullscreenAction | StopFullscreenAction |
StartFromTextbookAction | StartFromMenuAction |
ShowErrorAction | ResetErrorAction |
SetWordsAction | ResetGame |
NextWordAction | PrevWordAction |
RightAnswerAction | WrongAnswerAction;
