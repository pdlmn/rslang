import { useEffect } from 'react';
import { useAction } from '../../../hooks/useAction';
import { GameNames } from '../../../interfaces/gamesCommon';
import { GamesConteiner } from '../gamesCommon/gamesConteiner';

const name = GameNames.AudioCall;
const description = 'Тренирует восприятие речи на слух';

export const AudioCallMain = () => {
  const { selectGame } = useAction();

  useEffect(() => {
    selectGame({ name, description });
  }, []);

  return <GamesConteiner />;
};
