import { GameStatistic } from '../interfaces/services';
import {
  API_URI, buildQueryString, fetchData,
} from './common';

type GetGameStatisticsParams = {
  from: number,
  to: number,
};
const get = async (
  userId: string,
  authToken: string,
  params?: GetGameStatisticsParams,
) => {
  const requestOptions = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const queryString = buildQueryString(`${API_URI}/users/${userId}/gameStatistics`, (params || {}));
  const data = await fetchData<GameStatistic[]>(queryString, requestOptions);
  return data as GameStatistic[];
};

const send = async (
  userId: string,
  authToken: string,
  {
    gameName, learnedWords, correctAnswers, incorrectAnswers, correctAnswersInARow,
  }: Omit<GameStatistic, 'date'>,
) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      gameName, learnedWords, correctAnswers, incorrectAnswers, correctAnswersInARow,
    }),
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  };

  const queryString = `${API_URI}/users/${userId}/gameStatistics`;
  const data = await fetchData<GameStatistic>(queryString, requestOptions);
  return data;
};

const gameStatistics = {
  send,
  get,
};

export default gameStatistics;
