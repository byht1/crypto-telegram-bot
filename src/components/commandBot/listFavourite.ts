import { currencyApi } from "api";
import { bot } from "app";
import { selectCurrencyUser } from "components/dataBase";
import { createError, priceAdjustment } from "helpers";
import { TData } from "type";

export const listFavourite = async (id: number) => {
  try {
    const userData = await selectCurrencyUser(id);

    if (!userData) throw createError("Ваш список пустий");

    const { followingList } = userData;
    const data: string[] = JSON.parse(followingList);

    const res = await currencyApi(data.join(","));
    let resArr: TData[] = [];
    if (!Array.isArray(res)) {
      resArr.push(res);
    } else {
      resArr = [...res];
    }

    const mes = resArr.reduce((acc, x) => {
      return (acc += `${x.symbol} $${priceAdjustment(x.prise)} \n`);
    }, "");

    await bot.sendMessage(id, mes);
  } catch {
    bot.sendMessage(id, "Сталася помилка сппробуйте пізніше");
  }
};
