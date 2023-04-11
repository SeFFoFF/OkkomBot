const OPTIONS = require("../variables/options")
const SERVICES = require("../variables/services")

const sendData = require("../utils/sendData")

const botOnCallbackQuery = (bot, CHAT_STORE) => {
    bot.on("callback_query", async (msg) => {
        const data = msg.data
        const chatId = msg.message.chat.id
        const username = msg.message.chat.username

        const form = { chat_id: msg.from.id, message_id: msg.message.message_id }

        if (CHAT_STORE.wishes.isReadyToWishes) {
            if (data === "yes") {
                CHAT_STORE.wishes = {
                    ...CHAT_STORE.wishes,
                    isReadyToWishes: false,
                    isActive: true
                }

                return bot.editMessageText("Чекаємо на Ваш коментар!", form)
            } else {
                await sendData(bot, CHAT_STORE, chatId, username, "window")
            }
        }

        if (CHAT_STORE.order.window.orderStep) {
            switch (data) {
            case "profile": {
                await bot.editMessageText("*Пояснення що таке профіль*", form)
                return bot.editMessageReplyMarkup(OPTIONS.windowsOptions.step3WithoutProfile, form)
            }
            case "60mm": {
                CHAT_STORE.order.window = {
                    ...CHAT_STORE.order.window,
                    orderStep: 4,
                    profile: "60мм"
                }
                await bot.editMessageText("Який Ви бажаєте склопакет?", form)
                return bot.editMessageReplyMarkup(OPTIONS.windowsOptions.step4, form)
            }
            case "70mm": {
                CHAT_STORE.order.window = {
                    ...CHAT_STORE.order.window,
                    orderStep: 4,
                    profile: "70мм"
                }
                await bot.editMessageText("Який Ви бажаєте склопакет?", form)
                return bot.editMessageReplyMarkup(OPTIONS.windowsOptions.step4, form)
            }
            case "85mm": {
                CHAT_STORE.order.window = {
                    ...CHAT_STORE.order.window,
                    orderStep: 4,
                    profile: "85мм"
                }
                await bot.editMessageText("Який Ви бажаєте склопакет?", form)
                return bot.editMessageReplyMarkup(OPTIONS.windowsOptions.step4, form)
            }
            case "difference": {
                await bot.editMessageText("*Пояснення різниці*", form)
                return bot.editMessageReplyMarkup(OPTIONS.windowsOptions.step4WithoutDifference, form)
            }
            case "oneСhamber": {
                CHAT_STORE.order = {
                    ...CHAT_STORE.order,
                    whatIsOrdered: "window"
                }

                CHAT_STORE.order.window = {
                    ...CHAT_STORE.order.window,
                    orderStep: null,
                    doubleGlazedWindows: "Однокамерний"
                }

                CHAT_STORE.wishes = {
                    ...CHAT_STORE.wishes,
                    isReadyToWishes: true
                }

                await bot.editMessageText("Бажаєте залишити коментар чи побажання?", form)
                return bot.editMessageReplyMarkup(OPTIONS.botOptions.wishes, form)
            }
            case "twoСhamber": {
                CHAT_STORE.order = {
                    ...CHAT_STORE.order,
                    whatIsOrdered: "window"
                }

                CHAT_STORE.order.window = {
                    ...CHAT_STORE.order.window,
                    orderStep: null,
                    doubleGlazedWindows: "Двокамерний"
                }

                CHAT_STORE.wishes = {
                    ...CHAT_STORE.wishes,
                    isReadyToWishes: true
                }

                await bot.editMessageText("Бажаєте залишити коментар чи побажання?", form)
                return bot.editMessageReplyMarkup(OPTIONS.botOptions.wishes, form)
            }
            case "threeСhamber": {
                CHAT_STORE.order = {
                    ...CHAT_STORE.order,
                    whatIsOrdered: "window"
                }

                CHAT_STORE.order.window = {
                    ...CHAT_STORE.order.window,
                    orderStep: null,
                    doubleGlazedWindows: "Трикамерний"
                }

                CHAT_STORE.wishes = {
                    ...CHAT_STORE.wishes,
                    isReadyToWishes: true
                }

                await bot.editMessageText("Бажаєте залишити коментар чи побажання?", form)
                return bot.editMessageReplyMarkup(OPTIONS.botOptions.wishes, form)
            }
            default: return null
            }
        }

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
            CHAT_STORE.botState = {
                ...CHAT_STORE.botState,
                action: "REQUEST"
            }

            CHAT_STORE.requestToManager = {
                ...CHAT_STORE.requestToManager,
                isActive: true
            }

            return bot.sendMessage(chatId, "Залиште, будь ласка, ваше повідомлення і наш менеджер з Вами зв'яжеться", OPTIONS.botOptions.cancel)
        }
        default: return undefined
        }
    })
}

module.exports = botOnCallbackQuery