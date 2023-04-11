const fetch = require("node-fetch")

const MANAGERS = require("../variables/managers")
const OPTIONS = require("../variables/options")

const addRequestToJson = require("../utils/addRequestToJson")

const TOKEN = process.env.TELEGRAM_API_TOKEN

const sendData = async (bot, CHAT_STORE, chatId, username, order) => {
    let message = ""
    let requestObject = {}

    switch (order) {
    case "window": {
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

            requestObject = {
                date: new Date(),
                whatIsOrdered: "Вікно",
                type: CHAT_STORE.order.window.type,
                sizes: {
                    width: CHAT_STORE.order.window.sizes.width,
                    height: CHAT_STORE.order.window.sizes.height
                },
                profile: CHAT_STORE.order.window.profile,
                doubleGlazedWindows: CHAT_STORE.order.window.doubleGlazedWindows,
                user: username,
                wish: CHAT_STORE.wishes.wishesText
            }
        } else {
            message = `
                    <u>Отримано замовлення</u>
                    Вікно №<b>${CHAT_STORE.order.window.type}</b>
                    Розміри: ширина <b>${CHAT_STORE.order.window.sizes.width}см</b>, висота <b>${CHAT_STORE.order.window.sizes.height}см</b>
                    Профіль: <b>${CHAT_STORE.order.window.profile}</b>
                    Склопакет: <b>${CHAT_STORE.order.window.doubleGlazedWindows}</b>
                    Замовник: <b>@${username}</b>
            `

            requestObject = {
                date: new Date(),
                whatIsOrdered: "Вікно",
                type: CHAT_STORE.order.window.type,
                sizes: {
                    width: CHAT_STORE.order.window.sizes.width,
                    height: CHAT_STORE.order.window.sizes.height
                },
                profile: CHAT_STORE.order.window.profile,
                doubleGlazedWindows: CHAT_STORE.order.window.doubleGlazedWindows,
                user: username
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

    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${MANAGERS.okkom}&text=${message}&parse_mode=HTML`
    const urlForTheTest = `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${335150059}&text=${message}&parse_mode=HTML`

    try {
        await fetch(url)
        await fetch(urlForTheTest)

        addRequestToJson(requestObject)

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