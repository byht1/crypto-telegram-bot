import db, { tableName } from "dbConnect";

export const newUser = async (id: number, followingList: string[]) => {
  const dbPush = `INSERT INTO ${tableName}(chatId, followingList) VALUES (?, ?)`;

  db.run(dbPush, [id, JSON.stringify(followingList)], (error) => {
    if (error) throw console.log("PUSH", error.message);
  });
};
