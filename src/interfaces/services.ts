type User = {
  id: string,
  name: string,
  email: string,
  password: string,
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

type UserWord = {
  id: string,
  difficulty: string,
  optional?: Record<string, string | boolean>,
};

type AggregatedWord = Omit<Word, 'id'> & {
  _id: string,
  userWord: Omit<UserWord, 'id'>,
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
  name: string
} & Token;

// filter object for mongodb queries
type FilterObject = {
  [key: string]: string | FilterObject | FilterObject[] | null
};

type Statistic = {
  learnedWords: number,
  optional?: Record<string, string>,
};

type UserSettings = {
  wordsPerDay: number,
  optional?: Record<string, string>,
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
};
