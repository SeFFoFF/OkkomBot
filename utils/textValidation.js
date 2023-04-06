const textValidation = (bot, chatId, text, sticker) => {
    if (text && text[0] === "/") return bot.sendMessage(chatId, "Помилка, у запиті не можна використовувати команди бота")
    else if (sticker) return bot.sendMessage(chatId, "Помилка, у запиті не можна використовувати стікери")
}

module.exports = textValidation