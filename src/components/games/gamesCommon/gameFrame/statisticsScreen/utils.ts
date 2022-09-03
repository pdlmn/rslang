import { WordInfo } from '../../../../../interfaces/gameWords';
import { AggregatedWord, Word } from '../../../../../interfaces/services';

export function shuffle<T>(arr: Array<T>): Array<T> {
  const copy: Array<T> = arr.slice();
  const result: Array<T> = [];
  while (copy.length > 0) {
    const randomIndex = Math.floor(Math.random() * copy.length);
    result.push(copy[randomIndex]);
    copy.splice(randomIndex, 1);
  }
  return result as Array<T>;
}

export const addStatAndShuffleWords = (words: Array<Word>): Array<WordInfo> => shuffle(words)
  .map((word) => (
    {
      ...word,
      isAnswered: false,
      isCorrect: false,
      _id: word.id,
      userWord: {
        difficulty: 'easy',
      },
    }
  ));

export const addStatAndShuffleAggregatedWords = (
  words: Array<AggregatedWord>,
): Array<WordInfo> => shuffle(words)
  .map((word) => ({
    ...word,
    // eslint-disable-next-line no-underscore-dangle
    id: word._id,
    isAnswered: false,
    isCorrect: false,
  }));
