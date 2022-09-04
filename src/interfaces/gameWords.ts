import { UserWordOptional } from './services';

export interface WordInfo {
  id: string;
  group: 0;
  page: 0;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  userWord?: {
    difficulty: string,
    optional: UserWordOptional,
  },
}

export interface WordInfoPlus extends Required<WordInfo> {
  isAnswered: boolean,
  isCorrect: boolean,
  hasOptional: boolean,
  userWord: {
    difficulty: string,
    optional: Required<UserWordOptional>,
  },
}
