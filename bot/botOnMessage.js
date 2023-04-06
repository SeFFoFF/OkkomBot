const MANAGERS = require("../variables/managers")
const OPTIONS = require("../variables/options")

const sendData = require("../utils/sendData")

const botOnMessage = (bot, CHAT_STORE) => {
    bot.on("message", async (msg) => {
        const text = msg.text
        const chatId = msg.chat.id
        const username = msg.chat.username

        if (CHAT_STORE.wishes.isActive) {
            if (text && text[0] === "/") return bot.sendMessage(chatId, "Помилка, у запиті не можна використовувати команди бота")

            CHAT_STORE.wishes = {
                ...CHAT_STORE.wishes,
                wishesText: text
            }

            await sendData(bot, CHAT_STORE, chatId, username)
        }

        if (CHAT_STORE.isOtherOption) {
            if (text && text[0] === "/") return bot.sendMessage(chatId, "Помилка, у запиті не можна використовувати команди бота")

            if (!CHAT_STORE.requestToManager.text) {
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

                try {
                    const message = `Отримано запит від користувача @${username}. Запит: "${CHAT_STORE.requestToManager.text}", номер телефону: ${CHAT_STORE.requestToManager.phoneNumber}`
                    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${MANAGERS.okkom}&text=${message}`

                    await fetch(url)

                    CHAT_STORE.requestToManager = {
                        text: "",
                        phoneNumber: ""
                    }
                    CHAT_STORE = {
                        ...CHAT_STORE,
                        isOtherOption: false
                    }

                    return bot.sendMessage(chatId, "Запит прийнят, незабаром з Вами зв'яжеться наш менеджер!", OPTIONS.botOptions.welcome)
                } catch (error) {
                    return bot.sendMessage(chatId, "Помилка, запит не надіслано, спробуйте пізніше", OPTIONS.botOptions.welcome)
                }
            }
        }

        if (CHAT_STORE.order.window.orderStep) {
            if (text && text[0] === "/") return bot.sendMessage(chatId, "Помилка, у запиті не можна використовувати команди бота")

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
    })
}

module.exports = botOnMessage