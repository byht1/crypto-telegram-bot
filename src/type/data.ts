export type TData = {
  name: string;
  prise: number;
  symbol: string;
  "1h": number | null;
  "4h": number | null;
  "24h": number | null;
  api?: TApiName;
  date: number;
};

type TApiName =
  | "coinBase"
  | "coinMarketCap"
  | "coinPaprika"
  | "coinStats"
  | "kucoin";
