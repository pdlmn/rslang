import { GameNames, Levels } from '../../interfaces/gamesCommon';
import { GamesActionTypes } from '../../interfaces/redux/gamesCommon';

export const selectLevel = (payload: { level: Levels }) => ({
  type: GamesActionTypes.SelectLevel,
  payload,
});

export const selectGame = (payload: { name: GameNames, description: string }) => ({
  type: GamesActionTypes.SelectGame,
  payload,
});

export const startGame = () => ({
  type: GamesActionTypes.StartGame,
});

export const finishGame = () => ({
  type: GamesActionTypes.FinishGame,
});

export const mute = () => ({
  type: GamesActionTypes.Mute,
});

export const unmute = () => ({
  type: GamesActionTypes.Unmute,
});

export const startLoading = () => ({
  type: GamesActionTypes.StartLoading,
});

export const stopLoading = () => ({
  type: GamesActionTypes.StopLoading,
});

export const startFullscreen = () => ({
  type: GamesActionTypes.StartFullscreen,
});

export const stopFullscreen = () => ({
  type: GamesActionTypes.StopFullscreen,
});

export const startFromMenu = () => ({
  type: GamesActionTypes.StartFromMenu,
});

export const startFromTextbook = () => ({
  type: GamesActionTypes.StartFromTextbook,
});

export const showError = (payload: { error: Error }) => ({
  type: GamesActionTypes.ShowError,
  payload,
});

export const resetError = () => ({
  type: GamesActionTypes.ResetError,
});
