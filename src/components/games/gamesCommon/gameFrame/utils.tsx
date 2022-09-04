import { useMemo } from 'react';
import { GameNames } from '../../../../interfaces/gamesCommon';
import { UserAuthData } from '../../../../interfaces/redux/auth';
import { GameStatistic } from '../../../../interfaces/services';
import gameStatistics from '../../../../services/gameStatistics';
import { AudioCallGame } from '../../audioCall/audioCallGame';
import { SprintGame } from '../../sprint/sprintGame';

export const gameComponentByName = (name: GameNames | '') => {
  const games = useMemo(() => ({
    [GameNames.Sprint]: <SprintGame />,
    [GameNames.AudioCall]: <AudioCallGame />,
  }), []);

  return games[name as GameNames] || <p>Game not found</p>;
};

export const sendGameStatistic = async (user: UserAuthData, body: GameStatistic) => {
  await gameStatistics.send(user.userId, user.token, body);
  const res = await gameStatistics.get(user.userId, user.token);
  console.log(res);
};


