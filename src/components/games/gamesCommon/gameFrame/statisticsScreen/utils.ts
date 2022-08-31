import { WordInfo } from '../../../../../interfaces/gameWords';
import { Word } from '../../../../../interfaces/services';

export function shuffle<T>(arr: Array<T>): Array<T> {
  const copy = arr.slice();
  const result: Array<T> = [];
  while (copy.length > 0) {
    const randomIndex = Math.floor(Math.random() * copy.length);
    result.push(copy[randomIndex]);
    copy.splice(randomIndex, 1);
  }
  return result;
}

export const addStatAndShuffleWords = (words: Array<Word>): Array<WordInfo> => shuffle(words)
  .map((word) => (
    { ...word, isAnswered: false, isCorrect: false }
  ));
