const TelegramApi = require("node-telegram-bot-api")
require("dotenv").config()
const TOKEN = process.env.TELEGRAM_API_TOKEN
const bot = new TelegramApi(TOKEN, { polling: true })

const fetch = require("node-fetch")

const MANAGERS = require("./variables/managers")
const COMMANDS = require("./variables/commands")
const SERVICES = require("./variables/services")
const botOptions = require("./variables/botOptions")

let CHAT_STORE = {
    isOtherOption: false,
    requestToManager: {
        text: "",
        phoneNumber: ""
    }
}

const start = () => {
    bot.setMyCommands([
        { command: COMMANDS.start.command, description: COMMANDS.start.description },
        { command: COMMANDS.services.command, description: COMMANDS.services.description },
    ])

    bot.on("message", async (msg) => {
        const text = msg.text
        const chatId = msg.chat.id

        if (!CHAT_STORE.isOtherOption) {
            if (text === COMMANDS.start.command) {
                return bot.sendMessage(chatId, "Вас вітає бот компанії ОККОМ! ПРОДОЛЖЕНИЕ ТЕКСТА...", botOptions.welcome)
            }

            if (text === COMMANDS.services.command) {
                return bot.sendMessage(chatId, "Нижче наведені послуги, які ми надаємо", botOptions.services)
            }

            return bot.sendMessage(chatId, "Кх-кхм, не розумію про що ти... Вибери одну із запропонованих мною команд")
        }
    })

    bot.on("message", async (msg) => {
        const text = msg.text
        const chatId = msg.chat.id
        const username = msg.chat.username

        if (CHAT_STORE.isOtherOption) {
            if (text[0] !== "/") {
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

                        return bot.sendMessage(chatId, "Запит прийнят, незабаром з Вами зв'яжеться наш менеджер!", botOptions.welcome)
                    } catch (error) {
                        return bot.sendMessage(chatId, "Помилка, запит не надіслано, спробуйте пізніше", botOptions.welcome)
                    }
                }
            } else return bot.sendMessage(chatId, "Помилка, у запиті не можна використовувати команди бота")
        }
    })

    bot.on("callback_query", async (msg) => {
        const data = msg.data
        const chatId = msg.message.chat.id

        switch (data) {
        case "ourServices": {
            return bot.sendMessage(chatId, "Нижче наведені послуги, які ми надаємо", botOptions.services)
        }
        case SERVICES.metalPlasticConstructions.callbackData: {
            await bot.sendMessage(chatId, "ВЕДУТСЯ РАБОТЫ, ВЫПЕЙТЕ ЧАШЕЧКУ КОФЕ И ПОПРОБУЙТЕ ПОЗЖЕ")
            return bot.sendSticker(chatId, "https://img-04.stickers.cloud/packs/3a61acd0-d362-45f5-9307-2c9c99ac0bbe/webp/96a802c4-9e6c-4354-aa90-229db45583c6.webp")
        }
        case SERVICES.interiorDoor.callbackData: {
            await bot.sendMessage(chatId, "ВЕДУТСЯ РАБОТЫ, ВЫПЕЙТЕ ЧАШЕЧКУ КОФЕ И ПОПРОБУЙТЕ ПОЗЖЕ")
            return bot.sendSticker(chatId, "https://img-04.stickers.cloud/packs/3a61acd0-d362-45f5-9307-2c9c99ac0bbe/webp/96a802c4-9e6c-4354-aa90-229db45583c6.webp")
        }
        case SERVICES.protectiveShutters.callbackData: {
            await bot.sendMessage(chatId, "ВЕДУТСЯ РАБОТЫ, ВЫПЕЙТЕ ЧАШЕЧКУ КОФЕ И ПОПРОБУЙТЕ ПОЗЖЕ")
            return bot.sendSticker(chatId, "https://img-04.stickers.cloud/packs/3a61acd0-d362-45f5-9307-2c9c99ac0bbe/webp/96a802c4-9e6c-4354-aa90-229db45583c6.webp")
        }
        case SERVICES.rollerBlinds.callbackData: {
            await bot.sendMessage(chatId, "ВЕДУТСЯ РАБОТЫ, ВЫПЕЙТЕ ЧАШЕЧКУ КОФЕ И ПОПРОБУЙТЕ ПОЗЖЕ")
            return bot.sendSticker(chatId, "https://img-04.stickers.cloud/packs/3a61acd0-d362-45f5-9307-2c9c99ac0bbe/webp/96a802c4-9e6c-4354-aa90-229db45583c6.webp")
        }
        case SERVICES.other.callbackData: {
            CHAT_STORE = {
                ...CHAT_STORE,
                isOtherOption: true
            }
            return bot.sendMessage(chatId, "Якщо у Вас є якесь питання, то Ви можете його нам написати і наш менеджер з Вами зв'яжеться (придумать нормальный текст)")
        }
        default: return undefined
        }
    })
}

start()