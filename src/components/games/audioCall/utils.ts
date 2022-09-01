import { WordInfo } from '../../../interfaces/gameWords';
import { shuffle } from '../gamesCommon/gameFrame/statisticsScreen/utils';

export const getVariants = (arr: Array<WordInfo>, currIndex: number) => shuffle(
  [
    arr[currIndex],
    ...shuffle(arr.filter(
      (word) => word.wordTranslate !== arr[currIndex].wordTranslate,
    )).slice(0, 4),
  ].map((word) => word.wordTranslate.toUpperCase()),
);

export const variantBtnColor = (
  isAnswered: boolean,
  btnIndex: number,
  userAnswer: number,
  correctAnswer: number,
) => {
  if (isAnswered) {
    if (btnIndex === correctAnswer) {
      return 'green';
    }
    if (btnIndex === userAnswer) {
      return 'red';
    }
  }
  return 'gray';
};
