import db, { tableName } from "dbConnect";
import { TDataLocal } from "type";

export const selectCurrencyUser = async (id: number) => {
  const query = `SELECT * FROM ${tableName} WHERE chatId = ${id}`;

  return new Promise<TDataLocal | undefined>((res) =>
    db.get(query, [], (error, rows) => {
      if (error) return console.log("SELECT", error.message);
      res(rows);
    })
  );
};
