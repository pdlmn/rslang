import { useMemo } from 'react';
import { GameNames } from '../../../../interfaces/gamesCommon';
import { UserAuthData } from '../../../../interfaces/redux/auth';
import AggregatedWords from '../../../../services/aggregatedWords';
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
  console.log(await AggregatedWords
    .get(user.userId, user.token, {
      wordsPerPage: 20,
    }))
};

