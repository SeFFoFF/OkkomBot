const COMMANDS = require("../variables/commands")
const OPTIONS = require("../variables/options")
const sendData = require("../utils/sendData")

const botOnCommands = (bot, CHAT_STORE) => {
    bot.on("message", async (msg) => {
        const text = msg.text
        const chatId = msg.chat.id

        if (!CHAT_STORE.isOtherOption || CHAT_STORE.order.window.orderStep === null) {
            if (text === COMMANDS.start.command) {
                return bot.sendMessage(chatId, "Вас вітає бот компанії ОККОМ! ПРОДОЛЖЕНИЕ ТЕКСТА...", OPTIONS.botOptions.welcome)
            }

            if (text === COMMANDS.services.command) {
                return bot.sendMessage(chatId, "Нижче наведені послуги, які ми надаємо", OPTIONS.botOptions.services)
            }

            // return bot.sendMessage(chatId, "Кх-кхм, не розумію про що ти... Вибери одну із запропонованих мною команд")
        }
    })
}

module.exports = botOnCommands