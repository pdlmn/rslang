import { Word } from '../interfaces/services';
import { API_URI, buildQueryString, fetchData } from './common';

// raw unaltered words data

const get = async (params: { group?: number, page?: number } = {}) => {
  const queryString = buildQueryString(`${API_URI}/words`, params);
  const data = await fetchData<Word[]>(queryString);
  return data;
};

const getOne = async (wordId: string) => {
  const data = await fetchData<Word>(`${API_URI}/words/${wordId}`);
  return data;
};

export const Words = {
  get,
  getOne,
} as const;

export default Words;
