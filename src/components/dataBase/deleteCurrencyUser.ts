import { createError } from "helpers";
import { selectCurrencyUser } from "./selectCurrencyUser";
import { update } from "./update";

export const deleteCurrencyUser = async (id: number, data: string) => {
  const res = await selectCurrencyUser(id);

  if (!res) throw createError();

  const { followingList } = res;

  const currencyList: string[] = JSON.parse(followingList);

  if (!followingList) throw createError();
  if (!currencyList.includes(data))
    // return "У вашому списку обраних немає такої валюти";
    throw createError("У вашому списку обраних немає такої валюти", 400);

  const newCurrencyList = currencyList.filter((x) => x !== data);

  return await update(id, newCurrencyList);
};
