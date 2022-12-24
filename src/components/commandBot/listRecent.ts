import { popularApi } from "api";
import { bot } from "app";
import { priceAdjustment } from "helpers";

export const listRecent = async (id: number) => {
  try {
    const res = await popularApi();

    const mes = res.reduce((acc, x) => {
      return (acc += `${x.symbol} $${priceAdjustment(x.prise)} \n`);
    }, "");

    await bot.sendMessage(id, mes);
  } catch {
    bot.sendMessage(id, "Сталася помилка спробуйте пізніше");
  }
};
