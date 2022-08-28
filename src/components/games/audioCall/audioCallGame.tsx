export const AudioCallGame = () => (
  <p>Игра Аудиовызов еще не готова</p>
);

/*

import { useEffect } from 'react';
import { useAction } from '../../../hooks/useAction';
import { useTypedSelector } from '../../../redux';

export const AudioCallGame = () => {
  const words = useTypedSelector((state) => state.gameWords.words);
  const currentWord = useTypedSelector((state) => state.gameWords.currentWordIndex);
  const {
    nextWord, rightAnswer, wrongAnswer, finishGame,
  } = useAction();
  // const { prevWord } = useAction();

  return (
    <p>Аудиовызов</p>
  );
};

*/
