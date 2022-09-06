import { WordInfo, WordInfoPlus } from '../../../../../interfaces/gameWords';
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

const updateUserWord = (word: WordInfo): WordInfoPlus => ({
  ...word,
  isAnswered: false,
  isCorrect: false,
  hasOptional: !!word.userWord?.optional,
  userWord: {
    difficulty: word.userWord?.difficulty ? word.userWord.difficulty : 'easy',
    optional: {
      learned: false,
      combo: 0,
      date: Date.now(),
      source: 'game',
      gameSprint: {
        rightAnswers: 0,
        wrongAnswers: 0,
      },
      gameAudiocall: {
        rightAnswers: 0,
        wrongAnswers: 0,
      },
      ...(word.userWord?.optional || {}),
    },
  },
});

export const addStatAndShuffleWords = (words: Array<Word>): Array<WordInfoPlus> => shuffle(words)
  .map((word) => updateUserWord(word));

export const addStatAndShuffleAggregatedWords = (
  words: Array<AggregatedWord>,
): Array<WordInfoPlus> => shuffle(words)
  .map((word) => ({
    ...word,
    // eslint-disable-next-line no-underscore-dangle
    id: word._id,
  })).map((wordInfo) => updateUserWord(wordInfo));
