const textValidation = async (bot, chatId, text, sticker) => {
    if (text && text[0] === "/") {
        await bot.sendMessage(chatId, "Помилка, у запиті не можна використовувати команди бота")
        return false
    }
    else if (sticker) {
        await bot.sendMessage(chatId, "Помилка, у запиті не можна використовувати стікери")
        return false
    }
    else return true
}

module.exports = textValidation