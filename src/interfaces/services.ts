type User = {
  id: string,
  name: string,
  email: string,
  password: string,
  signedUp: number,
};

type UserWithoutPassword = Omit<User, 'password'>;

type UserCreateError = {
  path: 'name'[] | 'email'[] | 'password'[],
  message: string,
};

// if post request for creating user didn't pass server validation it returns this
type UserCreateErrorResponse = {
  error: {
    status: 'failed',
    errors: UserCreateError[],
  }
};

type Word = {
  id: string,
  group: 0,
  page: 0,
  word: string,
  image: string,
  audio: string,
  audioMeaning: string,
  audioExample: string,
  textMeaning: string,
  textExample: string,
  transcription: string,
  wordTranslate: string,
  textMeaningTranslate: string,
  textExampleTranslate: string
};

type Optional = Record<string,
string |
boolean |
number |
{ rightAnswers: number, wrongAnswers: number }>;

export type UserWordOptional = {
  learned?: boolean,
  combo?: number,
  date?: number,
  source?: 'textbook' | 'game',
  gameSprint?: {
    rightAnswers: number,
    wrongAnswers: number
  },
  gameAudiocall?: {
    rightAnswers: number,
    wrongAnswers: number
  },
};

type UserWord = {
  id: string,
  difficulty: string,
  optional: UserWordOptional,
};

type AggregatedWord = Omit<Word, 'id'> & {
  _id: string,
  userWord?: {
    difficulty: string,
    optional: UserWordOptional,
  },
};

// an object with two arrays
type AggregatedObject = {
  paginatedResults: AggregatedWord[],
  totalCount: [{
    count: number
  }],
};

type Token = {
  token: string,
  refreshToken: string,
};

type UserToken = {
  message: string,
  userId: string,
  name: string,
  signedUp: number,
} & Token;

// filter object for mongodb queries
type FilterObject = {
  [key: string]: string | number | FilterObject | FilterObject[] | null | boolean
};

export type DateRange = {
  from: number,
  to: number,
};

type Statistic = {
  learnedWords: number,
  newWords: number,
};

type UserSettings = {
  wordsPerDay: number,
  optional?: Optional,
};

type GameStatistic = {
  gameName: string,
  learnedWords: number,
  newWords: number,
  correctAnswers: number,
  incorrectAnswers: number,
  correctAnswersInARow: number,
  date: number,
};

type WordStatistic = {
  id: string,
  userWord: {
    difficulty: string;
    optional: Required<UserWordOptional>;
  }
};

export type {
  User,
  UserCreateErrorResponse,
  UserWithoutPassword,
  Token,
  UserToken,
  Word,
  UserWord,
  AggregatedWord,
  AggregatedObject,
  FilterObject,
  Statistic,
  UserSettings,
  GameStatistic,
  WordStatistic,
};
