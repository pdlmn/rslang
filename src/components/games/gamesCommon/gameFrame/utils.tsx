import { useMemo } from 'react';
import { GameNames } from '../../../../interfaces/gamesCommon';
import { AudioCallGame } from '../../audioCall/audioCallGame';
import { SprintGame } from '../../sprint/sprintGame';

export const gameComponentByName = (name: GameNames | '') => {
  const games = useMemo(() => ({
    [GameNames.Sprint]: <SprintGame />,
    [GameNames.AudioCall]: <AudioCallGame />,
  }), []);

  return games[name as GameNames] || <p>Game not found</p>;
};

// TODO
export const sendGameStatistic = async () => {
  console.log('send game stat');
  return new Promise((resolve) => {
    setTimeout(() => resolve('stat sended'), 2000);
  });
};
