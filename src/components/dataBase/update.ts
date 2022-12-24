import db, { tableName } from "dbConnect";
import { createError } from "helpers";
// import { selectCurrencyUser } from "./selectCurrencyUser";

export const update = async (id: number, list: string[]): Promise<string[]> => {
  const query = `UPDATE ${tableName} SET followingList = ? WHERE chatId = ${id}`;

  return new Promise((res) => {
    db.run(query, [JSON.stringify(list)], (error) => {
      if (error) throw createError();
    });

    res(list);
  });
};
