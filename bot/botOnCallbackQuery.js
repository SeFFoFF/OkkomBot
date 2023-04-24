const OPTIONS = require("../variables/options")
const SERVICES = require("../variables/services")

const getWindowOrder = require("../orders/getWindowOrder")
const getMosquitoNetsOrder = require("../orders/getMosquitoNetsOrder")

const sendData = require("../utils/sendData")

const botOnCallbackQuery = (bot, CHAT_STORE) => {
    bot.on("callback_query", async (msg) => {
        const data = msg.data
        const chatId = msg.message.chat.id
        const username = msg.message.chat.username

        const form = { chat_id: msg.from.id, message_id: msg.message.message_id }

        if (CHAT_STORE.botState.action === "MENU") {
            switch (data) {
            case "ourServices": {
                await bot.editMessageText("Послуги, які ми надаємо", form)
                return bot.editMessageReplyMarkup(OPTIONS.botOptions.services, form)
            }
            case "cancel": {
                await bot.editMessageText("Послуги ОККОМ", form)
                return bot.editMessageReplyMarkup(OPTIONS.botOptions.services, form)
            }
            case SERVICES.metalPlasticConstructions.callbackData: {
                await bot.editMessageText("Металопластикові конструкції", form)
                return bot.editMessageReplyMarkup(OPTIONS.botOptions.metalPlasticConstructions, form)
            }
            case SERVICES.metalPlasticConstructions.types.windows.callbackData: {
                CHAT_STORE.botState = {
                    ...CHAT_STORE.botState,
                    action: "REQUEST"
                }

                CHAT_STORE.order.window = {
                    ...CHAT_STORE.order.window,
                    orderStep: 1
                }

                await bot.editMessageText("Оберіть вінко з представлених нижче (вiд 1 до 16)", form)
                return bot.sendPhoto(chatId, "https://raw.githubusercontent.com/SeFFoFF/OkkomBot/main/images/windows.jpg")
            }
            case SERVICES.metalPlasticConstructions.types.mosquitoNets.callbackData: {
                CHAT_STORE.botState = {
                    ...CHAT_STORE.botState,
                    action: "REQUEST"
                }

                CHAT_STORE.order.mosquitoNets = {
                    ...CHAT_STORE.order.mosquitoNets,
                    orderStep: 1
                }

                await bot.editMessageText("Яка москітна сітка Вам необхідна?", form)
                return bot.editMessageReplyMarkup(OPTIONS.mosquitoNetsOptions.step1, form)
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
            case SERVICES.support.callbackData: {
                CHAT_STORE.botState = {
                    ...CHAT_STORE.botState,
                    action: "REQUEST"
                }

                CHAT_STORE.requestToManager = {
                    ...CHAT_STORE.requestToManager,
                    isActive: true
                }

                return bot.sendMessage(chatId, "Залиште, будь ласка, ваше повідомлення і наш менеджер з Вами зв'яжеться", OPTIONS.botOptions.cancelWithMarkup)
            }
            default: return undefined
            }
        } else {
            if (CHAT_STORE.order.window.orderStep) {
                await getWindowOrder(bot, CHAT_STORE, data, form)
            }

            if (CHAT_STORE.order.mosquitoNets.orderStep) {
                await getMosquitoNetsOrder(bot, CHAT_STORE, chatId, data, form)
            }

            if (CHAT_STORE.wishes.isReadyToWishes) {
                if (data === "yes") {
                    CHAT_STORE.wishes = {
                        ...CHAT_STORE.wishes,
                        isReadyToWishes: false,
                        isActive: true
                    }
                    return bot.editMessageText("Чекаємо на Ваш коментар!", form)
                } else {
                    await sendData(bot, CHAT_STORE, chatId, username, CHAT_STORE.order.whatIsOrdered)
                }
            }
        }
    })
}

module.exports = botOnCallbackQuery