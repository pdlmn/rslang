import { UserWord } from '../interfaces/services';
import { API_URI, fetchData, genericGet } from './common';

// custom data on different words for users
// includes id, difficulty and miscellaneous custom data which can contain anything

const get = genericGet<UserWord[]>(
  (userId) => `${API_URI}/users/${userId}/words`,
);

const getOne = async (userId: string, wordId: string, authToken: string) => {
  const requestOptions = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const queryString = `${API_URI}/users/${userId}/words/${wordId}`;
  const data = await fetchData<(UserWord & { id: string }) | { status: number }
  >(queryString, requestOptions);

  if ((data as { status: number }).status === 404) {
    return null;
  }

  return data as UserWord;
};

const createOrUpdate = (method: 'POST' | 'PUT') => async (
  userId: string,
  wordId: string,
  authToken: string,
  { difficulty, optional = {} }: Omit<UserWord, 'id'>,
) => {
  const requestOptions = {
    method,
    body: JSON.stringify({ difficulty, optional }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  };

  const queryString = `${API_URI}/users/${userId}/words/${wordId}`;
  const data = await fetchData<UserWord>(queryString, requestOptions);
  return data;
};

const create = createOrUpdate('POST');

const update = createOrUpdate('PUT');

const deleteUserWord = async (
  userId: string,
  wordId: string,
  authToken: string,
) => {
  const queryString = `${API_URI}/users/${userId}/words/${wordId}`;
  const response = await fetch(queryString, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response;
};

const UserWords = {
  get,
  getOne,
  create,
  update,
  delete: deleteUserWord,
} as const;

export default UserWords;
