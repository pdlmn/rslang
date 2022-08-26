import { UserSettings } from '../interfaces/services';
import { API_URI, fetchData, genericGet } from './common';

const get = genericGet<UserSettings>((userId) => `${API_URI}/users/${userId}/settings`);

const update = async (
  userId: string,
  authToken: string,
  { wordsPerDay, optional = {} }: UserSettings,
) => {
  const requestOptions = {
    method: 'PUT',
    body: JSON.stringify({ wordsPerDay, optional }),
    headers: {
      Authorization: `Bearer ${authToken}`,
      'Content-Type': 'application/json',
    },
  };

  const queryString = `${API_URI}/users/${userId}/settings`;
  const data = await fetchData<UserSettings>(queryString, requestOptions);
  return data;
};

const Settings = {
  get,
  update,
} as const;

export default Settings;
