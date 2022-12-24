import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

import {
  helpMessage,
  startMessage,
  listRecent,
  currencySearch,
  listFavourite,
  deleteFavourite,
} from "components/commandBot";
import { addToFavourite } from "components/commandBot/addToFavourite";
// import { selectCurrencyUser } from "components/dataBase";

dotenv.config();

// Name https://t.me/crypto_IHdPA_bot
const { BOT_TOKEN = "" } = process.env;

export const bot = new TelegramBot(BOT_TOKEN, { polling: true });

const start = async () => {
  bot.setMyCommands([
    {
      command: "/help",
      description: "Допомога по роботі з ботом",
    },

    //Бот не давє використати
  ]);

  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;

    if (!msg.text) return;
    const [text, currency] = msg.text?.split(" ");

    if (text === "/start") {
      setTimeout(() => helpMessage(chatId), 7000);
      return await startMessage(chatId, msg.chat.first_name);
    }
    if (text === "/help") return await helpMessage(chatId);
    if (text === "/listRecent") return await listRecent(chatId);
    if (text === "/addToFavourite")
      return await addToFavourite(chatId, currency);
    if (text === "/deleteFavourite")
      return await deleteFavourite(chatId, currency);
    if (text === "/listFavourite") return await listFavourite(chatId);

    return await currencySearch(chatId, text);
  });

  bot.on("callback_query", async (msg): Promise<void | TelegramBot.Message> => {
    const chatId = msg.message?.chat.id ?? 0;

    if (!msg.data) return;
    const [text, currency] = msg.data.split(" ");

    if (text === "/addToFavourite")
      return await addToFavourite(chatId, currency);
    if (text === "/deleteFavourite")
      return await deleteFavourite(chatId, currency);
  });

  console.log("🚀  start");
};

start();
