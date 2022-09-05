import {
  Token,
  User,
  UserToken,
  UserWithoutPassword,
} from '../interfaces/services';
import { API_URI, fetchData, genericGet } from './common';

// without authorization, users can be ONLY created
// user can update or delete only themselves, hence why they need authTokens

const get = genericGet<UserWithoutPassword>(
  (userId) => `${API_URI}/users/${userId}`,
);

const create = async (user: Omit<User, 'id' | 'signedUp'>) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const data = await fetchData<Omit<User, 'password'>>(
    `${API_URI}/users`,
    requestOptions,
  );
  return data;
};

const update = async (
  userId: string,
  authToken: string,
  user: Omit<User, 'id'>,
) => {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  };

  const data = await fetchData<UserWithoutPassword>(
    `${API_URI}/users/${userId}`,
    requestOptions,
  );
  return data;
};

const deleteUser = async (userId: string, authToken: string) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const data = await fetch(`${API_URI}/users/${userId}`, requestOptions);
  return data;
};

// accepts ONLY refresh token, not auth token
const getToken = async (userId: string, refreshToken: string) => {
  const requestOptions = {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  };

  const data = await fetchData<Token>(
    `${API_URI}/users/${userId}/tokens`,
    requestOptions,
  );
  return data;
};

const signIn = async (email: string, password: string) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const data = await fetchData<UserToken>(`${API_URI}/signin`, requestOptions);
  return data;
};

const Users = {
  create,
  get,
  update,
  delete: deleteUser,
  signIn,
  getToken,
} as const;

export default Users;
