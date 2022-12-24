import { SendMessageOptions } from "node-telegram-bot-api";
import { currencyApi } from "api";
import { bot } from "app";
import { selectCurrencyUser } from "components/dataBase";
import { currencyMessage } from "helpers";
import { TData } from "type";

const inlineBnt = (
  currencyName: string,
  currencySymbol: string,
  isFavorite: boolean
): SendMessageOptions => {
  const btn = isFavorite
    ? {
        text: `Видалити ${currencyName} з обраних`,
        option: `/deleteFavourite ${currencySymbol}`,
      }
    : {
        text: `Додати ${currencyName} до обраних`,
        option: `/addToFavourite ${currencySymbol}`,
      };

  return {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: btn.text,
            callback_data: btn.option,
          },
        ],
      ],
    },
  };
};

const ifFavoriteCurrencyUser = (data: string | undefined, name: string) => {
  if (!data) return false;
  const arrCur: string[] = JSON.parse(data);

  return !!arrCur.find((x) => x === name);
};

export const currencySearch = async (id: number, str: string) => {
  const url = str.split("/")[1];
  try {
    const data = await currencyApi(url);

    const dataValid: TData = Array.isArray(data) ? data[0] : data;

    const userData = await selectCurrencyUser(id);

    // if (!userData) throw createError();

    const mes = currencyMessage(dataValid);

    const btn = ifFavoriteCurrencyUser(
      userData?.followingList,
      dataValid.symbol
    );

    bot.sendMessage(id, mes, inlineBnt(dataValid.name, dataValid.symbol, btn));
  } catch {
    bot.sendMessage(id, "Такої валюти не існує. Виберіть іншу");
  }
};
