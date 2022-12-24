import path from "path";
import { verbose } from "sqlite3";

const sqlite3 = verbose();

export const tableName = "usersTGBot2";

const URL_DB = path.join(__dirname, "../db/user.txt");

// const drop = `DROP TABLE ${tableName}`;
// const sqlCreateTable = `CREATE TABLE ${tableName}(chatId INT NOT NULL, followingList JSON)`;

const db = new sqlite3.Database(URL_DB, sqlite3.OPEN_READWRITE, (error) => {
  if (error) return console.log("CONNECT", error.message);
});

export default db;

// db.run(sqlCreateTable);
