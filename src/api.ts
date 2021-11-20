import axios, { AxiosPromise } from 'axios';
import { Context } from './constants';

const context = Context.DEV;

const base =
  // @ts-ignore
  context === Context.PROD
    ? `${process.env.REACT_APP_API_URL}/search/`
    : `${process.env.REACT_APP_API_URL_DEV}/search/`;

const sendRequest = async (request: AxiosPromise) => {
  return request
    .then((res) => {
      const { data, status } = res;
      if (status === 200 && data) return Number.isInteger(data) ? null : data;
    })
    .catch((err) => {
      return null;
    });
};

export const fetchTrendingTopics = async () => {
  const url = `${base}trending-topics`;
  return sendRequest(
    axios({
      method: 'GET',
      url,
    })
  );
};

export const sendSearch = async (search: string) => {
  return sendRequest(
    axios({
      method: 'POST',
      url: base,
      data: {
        keyword: search,
      },
    })
  );
};
