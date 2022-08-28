import { GameNames } from '../../../../interfaces/gamesCommon';
import { AudioCallGame } from '../../audioCall/audioCallGame';
import { SprintGame } from '../../sprint/sprintGame';

export const gameComponentByName = (name: GameNames | '') => {
  const games = [
    { name: GameNames.Sprint, component: <SprintGame /> },
    { name: GameNames.AudioCall, component: <AudioCallGame /> },
  ];

  return games.find((item) => item.name === name)?.component || <p>Game not found</p>;
};
