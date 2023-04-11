const COMMANDS = require("../variables/commands")
const OPTIONS = require("../variables/options")

const botOnCommands = (bot, CHAT_STORE) => {
    bot.on("message", async (msg) => {
        const text = msg.text
        const chatId = msg.chat.id

        if (CHAT_STORE.botState.action === "MENU") {
            if (text === COMMANDS.start.command) {
                return bot.sendMessage(chatId, "Вас вітає бот компанії ОККОМ! ПРОДОЛЖЕНИЕ ТЕКСТА...", OPTIONS.botOptions.welcome)
            }

            if (text === COMMANDS.services.command) {
                return bot.sendMessage(chatId, "Нижче наведені послуги, які ми надаємо", OPTIONS.botOptions.servicesWithMarkup)
            }

            return bot.sendMessage(chatId, "Кх-кхм, не розумію про що ти... Вибери одну із запропонованих мною команд", OPTIONS.botOptions.services)
        }
    })
}

module.exports = botOnCommands