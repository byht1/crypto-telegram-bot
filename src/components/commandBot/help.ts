import { bot } from "app";

// bot.setMyCommands([
//   {
//     command: "/start",
//     description: "Почнемо заробляти?",
//   },
//   {
//     command: "/help",
//     description: "Допомога по роботі з ботом",
//   },
//   {
//     command: "/listRecent",
//     description:
//       'Получить небольшой (20-50 айтемов) список "хайповой" крипты',
//   },
//   {
//     command: "/{currency_symbol}",
//     description: "получить подробную информацию о криптовалюте",
//   },
//   {
//     command: "/addToFavourite {currency_symbol}",
//     description: 'Добавляет крипту в раздел "избранное"',
//   },
//   {
//     command: "/listFavourite",
//     description: "возвращает лист избранной крипты в формате /listRecent",
//   },
//   {
//     command: "/deleteFavourite {currency_symbol}",
//     description: "удаляет крипту из избранного.",
//   },
// ]);

const help = [
  { command: "/start", mes: "Посати все спочатку" },
  {
    command: "/help",
    mes: "Отрисати всі можливі команди і пояснення, як ними користуватися",
  },
  {
    command: "/listRecent",
    mes: "Відправляє список самих хайпових криптовалюь",
  },
  {
    command: "/{currency_symbol}",
    mes: "Відправляє детальну інформацію про криптовалюту",
    example: "(/BTC)",
  },
  {
    command: "/addToFavourite {currency_symbol}",
    mes: "Додає криптовалюту в обрані",
    example: "(/addToFavourite BTC)",
  },
  {
    command: "/deleteFavourite {currency_symbol}",
    mes: "Видаляє криптовалюту з обраних",
    example: "(/deleteFavourite BTC)",
  },
  {
    command: "/listFavourite",
    mes: "Відправляє список обаних криптовалют в форматі /listRecent",
  },
];

export const helpMessage = async (id: number) => {
  const mes = help.reduce((acc, x) => {
    const example = x.example;
    acc += `Команда: ${x.command} \n`;
    acc += `Опис: ${x.mes} ${example ? "\n" : "\n\n"}`;
    if (example) acc += `Приклад написання: ${example} \n\n`;
    return acc;
  }, "");
  await bot.sendMessage(id, mes);
};
