import { GameNames, Levels } from '../../interfaces/gamesCommon';
import {
  GamesAction,
  GamesActionTypes,
  GamesState,
} from '../../interfaces/redux/gamesCommon';

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
  words: [],
  currentWordIndex: 0,
  correctAnswersRow: 0,
  correctAnswersRowMax: 0,
  wordsLearned: 0,
};

export const gamesReducer = (state = initialState, action: GamesAction) => {
  const comboNum = state.words[state.currentWordIndex]?.userWord?.difficulty.toUpperCase()
    === 'HARD'
    ? 5
    : 3;

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
    case GamesActionTypes.SetWords:
      return {
        ...state,
        ...action.payload,
      };
    case GamesActionTypes.NextWord:
      return {
        ...state,
        currentWordIndex: state.currentWordIndex + 1,
      };
    case GamesActionTypes.PrevWord:
      return {
        ...state,
        currentWordIndex: state.currentWordIndex - 1,
      };
    case GamesActionTypes.RightAnswer:
      return {
        ...state,
        correctAnswersRowMax:
          state.correctAnswersRow + 1 > state.correctAnswersRowMax
            ? state.correctAnswersRow + 1
            : state.correctAnswersRowMax,
        correctAnswersRow: state.correctAnswersRow + 1,
        wordsLearned:
          state.wordsLearned
          + (state.words[state.currentWordIndex].userWord.optional.combo
          < comboNum - 1
            ? 0
            : 1),
        words: [
          ...state.words.slice(0, state.currentWordIndex),
          {
            ...state.words[state.currentWordIndex],
            userWord: {
              difficulty:
                state.words[state.currentWordIndex].userWord.optional.combo
                < comboNum - 1
                  ? state.words[state.currentWordIndex].userWord.difficulty
                  : 'easy',
              optional: {
                ...state.words[state.currentWordIndex].userWord.optional,
                learned:
                  state.words[state.currentWordIndex].userWord.optional.combo
                  < comboNum - 1
                    ? state.words[state.currentWordIndex].userWord.optional
                      .learned
                    : true,
                combo:
                  state.words[state.currentWordIndex].userWord.optional.combo
                  < comboNum - 1
                    ? state.words[state.currentWordIndex].userWord.optional
                      .combo + 1
                    : 0,
                ...(state.name === GameNames.Sprint
                  ? {
                    gameSprint: {
                      ...state.words[state.currentWordIndex].userWord.optional
                        .gameSprint,
                      rightAnswers:
                          state.words[state.currentWordIndex].userWord.optional
                            .gameSprint.rightAnswers + 1,
                    },
                  }
                  : {}),
                ...(state.name === GameNames.AudioCall
                  ? {
                    gameAudiocall: {
                      ...state.words[state.currentWordIndex].userWord.optional
                        .gameAudiocall,
                      rightAnswers:
                          state.words[state.currentWordIndex].userWord.optional
                            .gameAudiocall.rightAnswers + 1,
                    },
                  }
                  : {}),
              },
            },
            isAnswered: true,
            isCorrect: true,
          },
          ...state.words.slice(state.currentWordIndex + 1),
        ],
      };
    case GamesActionTypes.WrongAnswer:
      return {
        ...state,
        correctAnswersRow: 0,
        words: [
          ...state.words.slice(0, state.currentWordIndex),
          {
            ...state.words[state.currentWordIndex],
            userWord: {
              ...state.words[state.currentWordIndex].userWord,
              optional: {
                ...state.words[state.currentWordIndex].userWord.optional,
                learned: false,
                combo: 0,
                ...(state.name === GameNames.Sprint
                  ? {
                    gameSprint: {
                      ...state.words[state.currentWordIndex].userWord.optional
                        .gameSprint,
                      wrongAnswers:
                          state.words[state.currentWordIndex].userWord.optional
                            .gameSprint.wrongAnswers + 1,
                    },
                  }
                  : {}),
                ...(state.name === GameNames.AudioCall
                  ? {
                    gameAudiocall: {
                      ...state.words[state.currentWordIndex].userWord.optional
                        .gameAudiocall,
                      wrongAnswers:
                          state.words[state.currentWordIndex].userWord.optional
                            .gameAudiocall.wrongAnswers + 1,
                    },
                  }
                  : {}),
              },
            },
            isAnswered: true,
            isCorrect: false,
          },
          ...state.words.slice(state.currentWordIndex + 1),
        ],
      };

    default:
      return state;
  }
};
