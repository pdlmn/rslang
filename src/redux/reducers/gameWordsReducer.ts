import { GameWordsActions, GameWordsActionTypes, GameWordsState } from '../../interfaces/redux/gameWords';

const initialState: GameWordsState = {
  words: [],
  currentWordIndex: 0,
};

export const gameWordsReducer = (state = initialState, action: GameWordsActions) => {
  switch (action.type) {
    case GameWordsActionTypes.SetWords:
      return {
        ...state,
        ...action.payload,
      };
    case GameWordsActionTypes.NextWord:
      return {
        ...state,
        currentWordIndex: state.currentWordIndex + 1,
      };
    case GameWordsActionTypes.PrevWord:
      return {
        ...state,
        currentWordIndex: state.currentWordIndex - 1,
      };
    case GameWordsActionTypes.RightAnswer:
      return {
        ...state,
        words: [
          ...state.words.slice(0, state.currentWordIndex),
          { ...state.words[state.currentWordIndex], isAnswered: true, isCorrect: true },
          ...state.words.slice(state.currentWordIndex + 1),
        ],
      };
    case GameWordsActionTypes.WrongAnswer:
      return {
        ...state,
        words: [
          ...state.words.slice(0, state.currentWordIndex),
          { ...state.words[state.currentWordIndex], isAnswered: true, isCorrect: false },
          ...state.words.slice(state.currentWordIndex + 1),
        ],
      };

    default:
      return {
        ...state,
      };
  }
};
