import { useEffect } from 'react';
import { useAction } from '../../../hooks/useAction';
import { GameNames } from '../../../interfaces/gamesCommon';
import { GamesConteiner } from '../gamesCommon/gamesConteiner';

const name = GameNames.Sprint;
const description = 'Тренирует навык быстрого перевода с английского языка на русский. Вам нужно выбрать соответствует ли перевод предложенному слову. Каждые 3 верные ответа подряд увеличивают множитель очков';

export const SprintMain = () => {
  const { selectGame } = useAction();

  useEffect(() => {
    selectGame({ name, description });
  }, []);

  return <GamesConteiner />;
};
