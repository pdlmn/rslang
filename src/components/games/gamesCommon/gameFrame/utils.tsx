import { useMemo } from 'react';
import { GameNames } from '../../../../interfaces/gamesCommon';
import { UserAuthData } from '../../../../interfaces/redux/auth';
import { GameStatistic, WordStatistic } from '../../../../interfaces/services';
import gameStatistics from '../../../../services/gameStatistics';
import UserWords from '../../../../services/usersWords';
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
};

export const sendWordStatistic = async (
  user: UserAuthData,
  body: WordStatistic,
  hasOptional: boolean,
) => {
  if (hasOptional) {
    UserWords.update(
      user.userId,
      body.id,
      user.token,
      body.userWord,
    );
  } else {
    UserWords.create(
      user.userId,
      body.id,
      user.token,
      body.userWord,
    );
  }
};
