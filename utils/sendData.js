const MANAGERS = require("../variables/managers")
const OPTIONS = require("../variables/options")

const writeData = require("./writeData")

const sendData = async (bot, CHAT_STORE, chatId, username, order) => {
    let message = ""
    let requestObject = {}

    switch (order) {
    case "window": {
        if (CHAT_STORE.wishes.wishesText) {
            message = `Отримано замовлення\nЗамовник: <b>@${username}</b>\n_________________________________\nВікно №<b>${CHAT_STORE.order.window.type}</b>\nРозміри: ширина <b>${CHAT_STORE.order.window.sizes.width}см</b>, висота <b>${CHAT_STORE.order.window.sizes.height}см</b>\nПрофіль: <b>${CHAT_STORE.order.window.profile}</b>\nСклопакет: <b>${CHAT_STORE.order.window.doubleGlazedWindows}</b>\n_________________________________\nКоментар: <b>${CHAT_STORE.wishes.wishesText}</b>`

            requestObject = {
                date: new Date(),
                whatIsOrdered: "window",
                type: CHAT_STORE.order.window.type,
                sizes: {
                    width: CHAT_STORE.order.window.sizes.width,
                    height: CHAT_STORE.order.window.sizes.height
                },
                profile: CHAT_STORE.order.window.profile,
                doubleGlazedWindows: CHAT_STORE.order.window.doubleGlazedWindows,
                username,
                wish: CHAT_STORE.wishes.wishesText
            }
        } else {
            message = `Отримано замовлення\nЗамовник: <b>@${username}</b>\n_________________________________\nВікно №<b>${CHAT_STORE.order.window.type}</b>\nРозміри: ширина <b>${CHAT_STORE.order.window.sizes.width}см</b>, висота <b>${CHAT_STORE.order.window.sizes.height}см</b>\nПрофіль: <b>${CHAT_STORE.order.window.profile}</b>\nСклопакет: <b>${CHAT_STORE.order.window.doubleGlazedWindows}</b>\n_________________________________`

            requestObject = {
                date: new Date(),
                whatIsOrdered: "window",
                type: CHAT_STORE.order.window.type,
                sizes: {
                    width: CHAT_STORE.order.window.sizes.width,
                    height: CHAT_STORE.order.window.sizes.height
                },
                profile: CHAT_STORE.order.window.profile,
                doubleGlazedWindows: CHAT_STORE.order.window.doubleGlazedWindows,
                username
            }
        }

        CHAT_STORE.order.window = {
            orderStep: null,
            type: null,
            sizes: {
                width: 0,
                height: 0
            },
            profile: 0,
            doubleGlazedWindows: ""
        }
        break
    }
    case "mosquitoNets": {
        if (CHAT_STORE.wishes.wishesText) {
            message = `Отримано замовлення\nЗамовник: <b>@${username}</b>\n_________________________________\nМоскітна сітка: <b>${CHAT_STORE.order.mosquitoNets.type}</b>\nРозміри: ширина <b>${CHAT_STORE.order.mosquitoNets.sizes.width}см</b>, висота <b>${CHAT_STORE.order.mosquitoNets.sizes.height}см</b>\nКолір: <b>${CHAT_STORE.order.mosquitoNets.color}</b>\n_________________________________\nКоментар: <b>${CHAT_STORE.wishes.wishesText}</b>`

            requestObject = {
                date: new Date(),
                whatIsOrdered: "mosquitoNets",
                type: CHAT_STORE.order.mosquitoNets.type,
                sizes: {
                    width: CHAT_STORE.order.mosquitoNets.sizes.width,
                    height: CHAT_STORE.order.mosquitoNets.sizes.height
                },
                color: CHAT_STORE.order.mosquitoNets.color,
                username,
                wish: CHAT_STORE.wishes.wishesText
            }
        } else {
            message = `Отримано замовлення\nЗамовник: <b>@${username}</b>\n_________________________________\nМоскітна сітка: <b>${CHAT_STORE.order.mosquitoNets.type}</b>\nРозміри: ширина <b>${CHAT_STORE.order.mosquitoNets.sizes.width}см</b>, висота <b>${CHAT_STORE.order.mosquitoNets.sizes.height}см</b>\nКолір: <b>${CHAT_STORE.order.mosquitoNets.color}</b>\n_________________________________`

            requestObject = {
                date: new Date(),
                whatIsOrdered: "mosquitoNets",
                type: CHAT_STORE.order.mosquitoNets.type,
                sizes: {
                    width: CHAT_STORE.order.mosquitoNets.sizes.width,
                    height: CHAT_STORE.order.mosquitoNets.sizes.height
                },
                color: CHAT_STORE.order.mosquitoNets.color,
                username
            }
        }

        CHAT_STORE.order.mosquitoNets = {
            orderStep: null,
            type: null,
            sizes: {
                width: 0,
                height: 0
            },
            color: null,
        }
        break
    }
    default: {
        message = `
            <u>Отримано запит</u>
            Запит: <b>${CHAT_STORE.requestToManager.text}</b>
            Користувач: <b>@${username}</b>
            Номер телефону: <b>${CHAT_STORE.requestToManager.phoneNumber}</b>
        `
        CHAT_STORE.requestToManager = {
            isActive: false,
            text: "",
            phoneNumber: ""
        }
        break
    }
    }

    try {
        const testID = 335150059

        await bot.sendMessage(MANAGERS.okkom, message, { parse_mode: "HTML" })
        await bot.sendMessage(testID, message, { parse_mode: "HTML" })

        writeData(requestObject)

        CHAT_STORE.order = {
            ...CHAT_STORE.order,
            whatIsOrdered: "",
        }

        CHAT_STORE.wishes = {
            isReadyToWishes: false,
            isActive: false,
            wishesText: ""
        }

        CHAT_STORE.botState = {
            ...CHAT_STORE.botState,
            action: "MENU"
        }

        return bot.sendMessage(chatId, "Запит прийнят, незабаром з Вами зв'яжеться наш менеджер!", OPTIONS.botOptions.servicesWithMarkup)
    } catch (error) {
        return bot.sendMessage(chatId, "Помилка, запит не надіслано, спробуйте пізніше", OPTIONS.botOptions.servicesWithMarkup)
    }
}

module.exports = sendData