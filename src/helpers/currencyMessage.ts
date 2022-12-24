import { TData } from "type";
import { priceAdjustment } from "./priceAdjustment";

export const currencyMessage = (data: TData | TData[]) => {
  if (Array.isArray(data)) {
    return data.reduce((acc, x) => {
      return (acc += message(x));
    }, "");
  }

  return message(data);
};

function message(obj: TData) {
  const {
    name,
    prise,
    symbol,
    "1h": oneHors,
    "4h": fourHors,
    "24h": era,
  } = obj;

  let mes = "";

  const defat = "0.00";

  mes += `${name.toLocaleUpperCase()} \n\n`;
  mes += `Абривіатура: ${symbol} \n`;
  mes += `Курс: ${priceAdjustment(prise)} \n`;
  mes += `Курс 1 годину назад: ${
    oneHors ? priceAdjustment(oneHors) : defat
  } \n`;
  mes += `Курс 4 години назад: ${
    fourHors ? priceAdjustment(fourHors) : defat
  } \n`;
  mes += `Курс 24 години назад: ${era ? priceAdjustment(era) : defat}`;

  return mes;
}
