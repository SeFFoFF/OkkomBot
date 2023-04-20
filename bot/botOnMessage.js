const OPTIONS = require("../variables/options")

const sendData = require("../utils/sendData")
const textValidation = require("../utils/textValidation")

const botOnMessage = (bot, CHAT_STORE) => {
    bot.on("message", async (msg) => {
        const text = msg.text
        const chatId = msg.chat.id
        const username = msg.chat.username

        let isTextValid = false

        if (CHAT_STORE.botState.action === "REQUEST") isTextValid = await textValidation(bot, chatId, msg.text, msg.sticker)

        if (CHAT_STORE.wishes.isActive && isTextValid) {
            CHAT_STORE.wishes = {
                ...CHAT_STORE.wishes,
                wishesText: text
            }
            await sendData(bot, CHAT_STORE, chatId, username, CHAT_STORE.order.whatIsOrdered)
        }

        if (CHAT_STORE.requestToManager.isActive && isTextValid) {
            if (!CHAT_STORE.requestToManager.text && isTextValid) {
                CHAT_STORE.requestToManager = {
                    ...CHAT_STORE.requestToManager,
                    text: text
                }
                return bot.sendMessage(chatId, "Введіть номер телефону")
            } else {
                CHAT_STORE.requestToManager = {
                    ...CHAT_STORE.requestToManager,
                    phoneNumber: text
                }
                await sendData(bot, CHAT_STORE, chatId, username)
            }
        }

        if (CHAT_STORE.order.window.orderStep && isTextValid) {
            switch (CHAT_STORE.order.window.orderStep) {
            case 1: {
                if (text < 1 || text > 16 || Number.isNaN(Number(text))) return bot.sendMessage(chatId, "Помилка, оберіть вінко від 1 до 16")

                CHAT_STORE.order.window = {
                    ...CHAT_STORE.order.window,
                    orderStep: 2,
                    type: Number(text)
                }

                return bot.sendMessage(chatId, "Введіть ширину вікна (см)")
            }
            case 2: {
                if (text < 1 || Number.isNaN(Number(text))) return bot.sendMessage(chatId, "Помилка, введіть правильне значення")

                if (!CHAT_STORE.order.window.sizes.width) {
                    CHAT_STORE.order.window.sizes = {
                        ...CHAT_STORE.order.window.sizes,
                        width: Number(text)
                    }

                    return bot.sendMessage(chatId, "Введіть висоту вікна (см)")
                } else {
                    CHAT_STORE.order.window.sizes = {
                        ...CHAT_STORE.order.window.sizes,
                        height: Number(text)
                    }

                    CHAT_STORE.order.window = {
                        ...CHAT_STORE.order.window,
                        orderStep: 3
                    }

                    return bot.sendMessage(chatId, "Який профіль Вас цікавить?", OPTIONS.windowsOptions.step3)
                }
            }
            default: return null
            }
        }

        if (CHAT_STORE.order.mosquitoNets.orderStep === 3 && isTextValid) {
            if (text < 1 || Number.isNaN(Number(text))) return bot.sendMessage(chatId, "Помилка, введіть правильне значення")

            if (!CHAT_STORE.order.mosquitoNets.sizes.width) {
                CHAT_STORE.order.mosquitoNets.sizes = {
                    ...CHAT_STORE.order.mosquitoNets.sizes,
                    width: Number(text)
                }

                return bot.sendMessage(chatId, "Введіть висоту конструкції (см)")
            } else {
                CHAT_STORE.order.mosquitoNets.sizes = {
                    ...CHAT_STORE.order.mosquitoNets.sizes,
                    height: Number(text)
                }

                CHAT_STORE.order.mosquitoNets = {
                    ...CHAT_STORE.order.mosquitoNets,
                    orderStep: null
                }

                CHAT_STORE.wishes = {
                    ...CHAT_STORE.wishes,
                    isReadyToWishes: true
                }

                return bot.sendMessage(chatId, "Бажаєте залишити коментар чи побажання?", OPTIONS.botOptions.wishesWithMarkup)
            }
        }
    })
}

module.exports = botOnMessage