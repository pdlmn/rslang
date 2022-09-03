import { AggregatedWord } from './services';

export interface WordInfo extends AggregatedWord {
  id: string,
  isAnswered?: boolean,
  isCorrect?: boolean,
  combo?: number,
}
