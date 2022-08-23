import { FilterObject } from '../interfaces/types';

// common variables and functions for services

// we will use the local deploy of server for development,
// as was recommended by RSSchool
const API_URI = process.env.NODE_ENV === 'production'
  ? 'https://react-rslang-2022.herokuapp.com'
  : 'http://localhost:5000';

const buildQueryString = (
  baseUri: string,
  params: Record<string, string | number | FilterObject>,
) => {
  const uriParamsArr = Object.entries(params);
  if (uriParamsArr.length <= 0) return baseUri;

  const uriParamsString = uriParamsArr
    // checks for objects for FilterObject
    // FilterObject is used for MongoDB queries 
    .map(([key, value]) => (typeof value === 'object'
      ? `${key}=${JSON.stringify(value)}`
      : `${key}=${value}`))
    .join('&');

  return `${baseUri}?${uriParamsString}`;
};

// returns data as objects in case or success, otherwise returns response itself
const fetchData = async <T>(endpoint: string, options?: RequestInit) => {
  const response = await fetch(endpoint, options);

  if (!response.ok) {
    return response;
  }

  return response.json() as Promise<T>;
};

const genericGet = <T>(
  endpoint: (userId: string) => string,
) => async (userId: string, authToken: string) => {
    const requestOptions = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    const data = await fetchData<T>(endpoint(userId), requestOptions);
    return data;
  };

export {
  API_URI, buildQueryString, fetchData, genericGet,
};
