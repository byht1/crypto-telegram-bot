import { bot } from "app";
import { deleteCurrencyUser } from "components/dataBase/deleteCurrencyUser";

export const deleteFavourite = async (id: number, name: string) => {
  try {
    await deleteCurrencyUser(id, name);
    bot.sendMessage(id, "валюту успішно видалено з обраних");
  } catch (error: any) {
    const mes = error
      ? error.message
      : "Вибачне сталася помилка спробуйте пізніше";

    bot.sendMessage(id, mes);
  }
};
