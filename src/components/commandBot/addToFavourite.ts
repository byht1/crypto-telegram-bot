import { bot } from "app";
import { AxiosError } from "axios";
import {
  newUser,
  selectCurrencyUser,
  updateCurrencyUser,
} from "components/dataBase";

export const addToFavourite = async (
  id: number,
  currency: string | undefined
) => {
  if (!currency)
    return await bot.sendMessage(
      id,
      "Ви не вказали яку валюту юажаєте додати до обраних. Якщо вам потрібна допомога уведіть команду /help"
    );

  try {
    const isUser = await selectCurrencyUser(id);

    if (!isUser) {
      newUser(id, [currency]);
    } else {
      const mes = await updateCurrencyUser(id, currency);
      if (!Array.isArray(mes)) {
        return await bot.sendMessage(id, mes);
      }
    }

    return await bot.sendMessage(id, "Валюту успішно додано");
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;

    const dataError = err.response?.data;

    const mes = dataError?.message ?? "Сталася помилка сппробуйте пізніше";
    return await bot.sendMessage(id, mes);
  }
};
