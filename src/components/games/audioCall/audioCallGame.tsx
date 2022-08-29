export const AudioCallGame = () => (
  <p>Игра Аудиовызов еще не готова</p>
);

/*

import { useEffect } from 'react';
import { useAction } from '../../../hooks/useAction';
import { useTypedSelector } from '../../../redux';

export const AudioCallGame = () => {
  const { words, currentWordIndex } = useTypedSelector((state) => state.gameWords);
  const {
    nextWord, rightAnswer, wrongAnswer, finishGame,
  } = useAction();
  // const { prevWord } = useAction();

  return (
    <p>Аудиовызов</p>
  );
};

*/
