import axios from "axios";
import { TData } from "type";

const BASE_URL = "https://crypto-rest-byht1.herokuapp.com/api/crypto";
// const BASE_URL = "http://localhost:5004/api/crypto";

axios.defaults.baseURL = BASE_URL;
type TCallback = (any?: any) => Promise<any>;

type TServer = (fn: TCallback, url?: string) => Promise<any>;

const server: TServer = async (fn, url) => {
  let attempts = 3;

  const call = async (): Promise<any> => {
    try {
      const res = await fn(url);

      attempts = 3;

      return res;
    } catch (error) {
      if (attempts <= 0) {
        attempts = 3;
        throw error;
      }

      attempts -= 1;

      return await call();
    }
  };

  return await call();
};

const popularServer = async () => {
  try {
    const { data } = await axios.get<TData[]>("/popular");

    return data;
  } catch (error) {
    throw error;
  }
};

export const currencyServer = async (str: string) => {
  const { data } = await axios.get<TData[]>(`/currency/${str}`);

  if (str.split(",").length > 1) return data;
  return data[0];
};

export const popularApi = async () => server(popularServer) as Promise<TData[]>;
export const currencyApi = async (currencyUrl: string) =>
  server(currencyServer, currencyUrl) as Promise<TData | TData[]>;
