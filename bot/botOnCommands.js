const COMMANDS = require("../variables/commands")
const OPTIONS = require("../variables/options")
const MANAGERS = require("../variables/managers")

const readData = require("../utils/readData")
const formatDate = require("../utils/formatDate")

const botOnCommands = (bot, CHAT_STORE) => {
    bot.on("message", async (msg) => {
        const text = msg.text
        const chatId = msg.chat.id

        if (CHAT_STORE.botState.action === "MENU") {
            if (!CHAT_STORE.botState.isUserManager && (chatId === MANAGERS.okkom || chatId === 335150059)) {
                CHAT_STORE.botState = {
                    ...CHAT_STORE.botState,
                    isUserManager: true
                }
                await bot.sendMessage(chatId, "Ви увійшли з облікового запису менеджера", OPTIONS.botOptions.managerKeyboard)
            }

            if (CHAT_STORE.botState.isUserManager && text === "Переглянути замовлення") {
                const loadJsonFile = async() => {
                    try {
                        return readData("db/orders.json")
                    } catch (err) {
                        console.error("fileRead error:", err)
                    }
                }

                const orders = await loadJsonFile()

                orders.forEach(order => {
                    let message = ""

                    switch (order.whatIsOrdered) {
                    case "window": {
                        const date = new Date(order.date)

                        if (order.wish)
                            message = `Дата замовлення: <b>${formatDate(date)}</b>\nЗамовник: <b>@${order.username}</b>\n_________________________________\nВікно №<b>${order.type}</b>\nРозміри: ширина <b>${order.sizes.width}см</b>, висота <b>${order.sizes.height}см</b>\nПрофіль: <b>${order.profile}</b>\nСклопакет: <b>${order.doubleGlazedWindows}</b>\nКоментар: <b>${order.wish}</b>\n_________________________________`
                        else
                            message = `Дата замовлення: <b>${formatDate(date)}</b>\nЗамовник: <b>@${order.username}</b>\n_________________________________\nВікно №<b>${order.type}</b>\nРозміри: ширина <b>${order.sizes.width}см</b>, висота <b>${order.sizes.height}см</b>\nПрофіль: <b>${order.profile}</b>\nСклопакет: <b>${order.doubleGlazedWindows}</b>\n_________________________________`
                        break
                    }
                    default: return null
                    }
                    return bot.sendMessage(chatId, message, { parse_mode: "HTML" })
                })
            }

            if (text === COMMANDS.start.command) {
                return bot.sendMessage(chatId, "Вас вітає бот компанії ОККОМ! ПРОДОЛЖЕНИЕ ТЕКСТА...", OPTIONS.botOptions.welcome)
            }

            if (text === COMMANDS.services.command) {
                return bot.sendMessage(chatId, "Нижче наведені послуги, які ми надаємо", OPTIONS.botOptions.servicesWithMarkup)
            }

            // return bot.sendMessage(chatId, "Кх-кхм, не розумію про що ти... Вибери одну із запропонованих мною команд", OPTIONS.botOptions.services)
        }
    })
}

module.exports = botOnCommands