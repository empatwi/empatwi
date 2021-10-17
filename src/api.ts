import axios from 'axios';
import { Context } from './constants';

const context = Context.DEV;

const { env } = process;
const { REACT_APP_API_URL, REACT_APP_API_URL_DEV } = env;

const base =
  context === Context.PROD
    ? `${REACT_APP_API_URL}/tweet/`
    : `${REACT_APP_API_URL_DEV}/tweet/`;

export const fetchTrendingTopics = async () => {
  return await axios({ method: 'GET', url: base })
    .then((res) => {
      return null;
    })
    .catch((err) => {
      return null;
    });
};
