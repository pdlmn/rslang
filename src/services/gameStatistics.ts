import { GameStatistic } from "../interfaces/services";
import { API_URI, fetchData, genericGet } from "./common";

const get = genericGet<GameStatistic>((userId) => `${API_URI}/users/${userId}/gameStatistics`);

const send = async (
  userId: string,
  authToken: string,
  { gameName, learnedWords, correctAnswers, incorrectAnswers, date = (Date.now()) }: GameStatistic,
) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({ gameName, learnedWords, correctAnswers, incorrectAnswers, date }),
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
