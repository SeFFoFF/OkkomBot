const TelegramApi = require("node-telegram-bot-api")
require("dotenv").config()
const TOKEN = process.env.TELEGRAM_API_TOKEN
const bot = new TelegramApi(TOKEN, { polling: true })

const botSetMyCommands = require("./bot/botSetMyCommands")
const botOnCommands = require("./bot/botOnCommands")
const botOnMessage = require("./bot/botOnMessage")
const botOnCallbackQuery = require("./bot/botOnCallbackQuery")

const CHAT_STORE = {
    botState: {
        action: "MENU", // MENU, REQUEST
        isUserManager: false
    },
    requestToManager: {
        isActive: false,
        text: "",
        phoneNumber: ""
    },
    order: {
        whatIsOrdered: "",
        phoneNumber: null,
        isReadyToPhoneNumber: false,
        window: {
            orderStep: null,
            type: null, // 1-16 from image
            sizes: {
                width: 0,
                height: 0
            },
            profile: 0, // 60mm, 70mm, 85mm
            doubleGlazedWindows: "", // однокамерний, двокамерний, трикамерний
        },
        mosquitoNets: {
            orderStep: null,
            type: null, // зовнішня, внутрішня, дверна
            color: null, // Білий, Антрацит, Золотий дуб, Горіх, Темний дуб
            sizes: {
                width: 0,
                height: 0
            }
        }
    },
    wishes: {
        isReadyToWishes: false,
        isActive: false,
        wishesText: ""
    }
}

const start = () => {
    botSetMyCommands(bot, CHAT_STORE)
    botOnCommands(bot, CHAT_STORE)
    botOnCallbackQuery(bot, CHAT_STORE)
    botOnMessage(bot, CHAT_STORE)
}

start()

module.exports = CHAT_STORE