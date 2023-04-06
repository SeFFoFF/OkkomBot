const fetch = require("node-fetch")

const MANAGERS = require("../variables/managers")
const OPTIONS = require("../variables/options")

const TOKEN = process.env.TELEGRAM_API_TOKEN

const sendData = async (bot, CHAT_STORE, chatId, username) => {
    let message = ""

    if (CHAT_STORE.wishes.wishesText) {
        message = `
            <u>Отримано замовлення</u>
            Вікно №<b>${CHAT_STORE.order.window.type}</b>
            Розміри: ширина <b>${CHAT_STORE.order.window.sizes.width}см</b>, висота <b>${CHAT_STORE.order.window.sizes.height}см</b>
            Профіль: <b>${CHAT_STORE.order.window.profile}</b>
            Склопакет: <b>${CHAT_STORE.order.window.doubleGlazedWindows}</b>
            Замовник: <b>@${username}</b>
            Коментар: <b>${CHAT_STORE.wishes.wishesText}</b>
        `
    } else {
        message = `
            <u>Отримано замовлення</u>
            Вікно №<b>${CHAT_STORE.order.window.type}</b>
            Розміри: ширина <b>${CHAT_STORE.order.window.sizes.width}см</b>, висота <b>${CHAT_STORE.order.window.sizes.height}см</b>
            Профіль: <b>${CHAT_STORE.order.window.profile}</b>
            Склопакет: <b>${CHAT_STORE.order.window.doubleGlazedWindows}</b>
            Замовник: <b>@${username}</b>
        `
    }

    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${MANAGERS.okkom}&text=${message}&parse_mode=HTML`
    const urlForTheTest = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${335150059}&text=${message}&parse_mode=HTML`

    try {
        await fetch(url)
        await fetch(urlForTheTest)

        CHAT_STORE.order.window = {
            orderStep: null,
            type: null,
            sizes: {
                width: 0,
                height: 0
            },
            profile: 0,
            doubleGlazedWindows: "",
        }

        CHAT_STORE.order = {
            ...CHAT_STORE.order,
            whatIsOrdered: "",
        }

        CHAT_STORE.wishes = {
            isReadyToWishes: false,
            isActive: false,
            wishesText: ""
        }

        return bot.sendMessage(chatId, "Запит прийнят, незабаром з Вами зв'яжеться наш менеджер!", OPTIONS.botOptions.cancel)
    } catch (error) {
        return bot.sendMessage(chatId, "Помилка, запит не надіслано, спробуйте пізніше", OPTIONS.botOptions.cancel)
    }
}

module.exports = sendData