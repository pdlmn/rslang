import { Levels } from '../../interfaces/gamesCommon';
import { GamesAction, GamesActionTypes, GamesState } from '../../interfaces/redux/gamesCommon';

const initialState: GamesState = {
  name: '',
  description: '',
  level: Levels.A1,
  fromTextbook: false,
  isMuted: false,
  isLoading: false,
  isStarted: false,
  isFinished: false,
  isFullscreen: false,
  error: null,
};

export const gamesReducer = (state = initialState, action: GamesAction) => {
  switch (action.type) {
    case GamesActionTypes.SelectLevel:
      return {
        ...state,
        ...action.payload,
      };
    case GamesActionTypes.SelectGame:
      return {
        ...state,
        ...action.payload,
      };
    case GamesActionTypes.StartGame:
      return {
        ...state,
        isStarted: true,
      };
    case GamesActionTypes.FinishGame:
      return {
        ...state,
        isFinished: true,
      };
    case GamesActionTypes.Mute:
      return {
        ...state,
        isMuted: true,
      };
    case GamesActionTypes.Unmute:
      return {
        ...state,
        isMuted: false,
      };
    case GamesActionTypes.StartLoading:
      return {
        ...state,
        isLoading: true,
      };
    case GamesActionTypes.StopLoading:
      return {
        ...state,
        isLoading: false,
      };
    case GamesActionTypes.StartFullscreen:
      return {
        ...state,
        isFullscreen: true,
      };
    case GamesActionTypes.StopFullscreen:
      return {
        ...state,
        isFullscreen: false,
      };
    case GamesActionTypes.StartFromTextbook:
      return {
        ...state,
        fromTextbook: true,
      };
    case GamesActionTypes.StartFromMenu:
      return {
        ...state,
        fromTextbook: false,
      };
    case GamesActionTypes.ShowError:
      return {
        ...state,
        ...action.payload,
      };
    case GamesActionTypes.ResetError:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
