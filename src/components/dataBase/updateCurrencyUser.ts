import { currencyApi } from "api";
import { createError } from "helpers";
import { selectCurrencyUser } from "./selectCurrencyUser";
import { update } from "./update";

export const updateCurrencyUser = async (
  id: number,
  data: string
): Promise<string[] | string> => {
  try {
    const res = await currencyApi(data);

    if (!res) throw new Error();

    const userData = await selectCurrencyUser(id);
    if (!userData) throw createError();

    const { followingList } = userData;
    const currencyList: string[] = JSON.parse(followingList);

    if (!followingList) throw createError();
    if (currencyList.includes(data)) return "Валюта уже додано";

    currencyList.push(data);

    return await update(id, currencyList);
  } catch (error) {
    throw error;
  }
};
