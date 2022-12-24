import { bot } from "app";

export const startMessage = async (id: number, name: string | undefined) => {
  await bot.sendSticker(
    id,
    "https://tlgrm.eu/_/stickers/336/145/33614508-8927-3268-9ec9-cf0b9048a3cb/1.webp"
  );
  await bot.sendMessage(
    id,
    `Привіт ${name ? name : ""}! \nЯ допоможу тобі заробити на кріптовалюті`
  );
};
