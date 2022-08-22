import { Statistic } from '../interfaces/types';
import { API_URI, fetchData, genericGet } from './common';

const get = genericGet<Statistic>((userId) => `${API_URI}/users/${userId}/statistics`);

const update = async (
  userId: string,
  authToken: string,
  { learnedWords, optional = {} }: Statistic,
) => {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify({ learnedWords, optional }),
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  };

  const queryString = `${API_URI}/users/${userId}/statistics`;
  const data = await fetchData<Statistic>(queryString, requestOptions);
  return data;
};

const Statistics = {
  get,
  update,
};

export default Statistics;
