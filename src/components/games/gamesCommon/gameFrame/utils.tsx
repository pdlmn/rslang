import { useMemo } from 'react';
import { GameNames } from '../../../../interfaces/gamesCommon';
import { UserAuthData } from '../../../../interfaces/redux/auth';
import { Statistic } from '../../../../interfaces/services';
import Statistics from '../../../../services/statistics';
import { AudioCallGame } from '../../audioCall/audioCallGame';
import { SprintGame } from '../../sprint/sprintGame';

type SendStatOptions = {
  user: UserAuthData,
}

export const gameComponentByName = (name: GameNames | '') => {
  const games = useMemo(() => ({
    [GameNames.Sprint]: <SprintGame />,
    [GameNames.AudioCall]: <AudioCallGame />,
  }), []);

  return games[name as GameNames] || <p>Game not found</p>;
};

// TODO
export const sendGameStatistic = async ({ user }: SendStatOptions) => {
  console.log('send game stat');
  const stat = await Statistics.get(user.userId, user.token) as Statistic;
  console.log(stat);
};
