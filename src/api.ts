import axios from 'axios';
import { Context } from './constants';

const context = Context.DEV;

const { env } = process;
const { REACT_APP_API_URL, REACT_APP_API_URL_DEV } = env;

const base =
  context === Context.PROD ? REACT_APP_API_URL : REACT_APP_API_URL_DEV;

export const fetchTrendingTopics = async () => {
  const url = `${base}/`;
  return await axios({
    method: 'GET',
    url,
  })
    .then((res) => {
      return null;
    })
    .catch((err) => {
      return null;
    });
};

export const sendSearch = async (search: string) => {
  const url = `${base}/`;
  return await axios({
    method: 'PUT',
    url,
    data: {
      keyword: search,
    },
  })
    .then((res) => {
      return null;
    })
    .catch((err) => {
      return null;
    });
};
