import { DateRange, Statistic } from '../interfaces/services';
import { API_URI, buildQueryString, fetchData } from './common';

const get = async (
  userId: string,
  authToken: string,
  params?: DateRange,
) => {
  const requestOptions = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  const queryString = buildQueryString(`${API_URI}/users/${userId}/statistics`, (params || {}));
  const data = await fetchData<Statistic>(queryString, requestOptions);
  return data as Statistic;
};

const Statistics = {
  get,
};

export default Statistics;
