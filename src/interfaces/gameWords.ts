import { Word } from './services';

export interface WordInfo extends Word {
  isAnswered?: boolean,
  isCorrect?: boolean,
  combo?: number,
}
