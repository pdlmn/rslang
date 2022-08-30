import { GameNames, Levels } from '../gamesCommon';

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
}

export interface GamesState {
  name: GameNames | '';
  description: string;
  level: Levels;
  fromPage: number;
  isMuted: boolean;
  isLoading: boolean;
  isStarted: boolean;
  isFinished: boolean;
  isFullscreen: boolean;
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

export type GamesAction =
SelectLevelAction | SelectGameAction |
MuteAction | UnmuteAction |
StartGameAction | FinishGameAction |
StartLoadingAction | StopLoadingAction |
StartFullscreenAction | StopFullscreenAction;
