import { AggregatedObject, AggregatedWord, FilterObject } from '../interfaces/services';
import { API_URI, buildQueryString, fetchData } from './common';

// aggregated words are a combination of regular words & custom words data for user
// this is the only data type we can use MongoDB queries on

type GetAggregatedWordsParams = {
  group?: number,
  page?: number,
  wordsPerPage?: number,
  filter?: FilterObject,
};

const get = async (
  userId: string,
  authToken: string,
  params: GetAggregatedWordsParams = {},
) => {
  const requestOptions = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const queryString = buildQueryString(`${API_URI}/users/${userId}/aggregatedWords`, params);
  const data = await fetchData<AggregatedObject>(queryString, requestOptions);
  return data;
};

const getOne = async (userId: string, wordId: string, authToken: string) => {
  const requestOptions = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const queryString = `${API_URI}/users/${userId}/aggregatedWords/${wordId}`;
  const data = await fetchData<AggregatedWord[]>(queryString, requestOptions);
  return data;
};

const AggregatedWords = {
  get,
  getOne,
} as const;

export default AggregatedWords;
