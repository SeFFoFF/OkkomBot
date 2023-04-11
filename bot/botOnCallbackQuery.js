const OPTIONS = require("../variables/options")
const SERVICES = require("../variables/services")

const sendData = require("../utils/sendData")

const botOnCallbackQuery = (bot, CHAT_STORE) => {
    bot.on("callback_query", async (msg) => {
        const data = msg.data
        const chatId = msg.message.chat.id
        const username = msg.message.chat.username

        if (CHAT_STORE.wishes.isReadyToWishes) {
            if (data === "yes") {
                CHAT_STORE.wishes = {
                    ...CHAT_STORE.wishes,
                    isReadyToWishes: false,
                    isActive: true
                }

                return bot.sendMessage(chatId, "Чекаємо на Ваш коментар!")
            } else {
                await sendData(bot, CHAT_STORE, chatId, username, "window")
            }
        }

        if (CHAT_STORE.order.window.orderStep) {
            switch (data) {
            case "profile": {
                return bot.sendMessage(chatId, "*Пояснення що таке профіль*", OPTIONS.windowsOptions.step3WithoutProfile)
            }
            case "60mm": {
                CHAT_STORE.order.window = {
                    ...CHAT_STORE.order.window,
                    orderStep: 4,
                    profile: "60мм"
                }
                return bot.sendMessage(chatId, "Який Ви бажаєте склопакет?", OPTIONS.windowsOptions.step4)
            }
            case "70mm": {
                CHAT_STORE.order.window = {
                    ...CHAT_STORE.order.window,
                    orderStep: 4,
                    profile: "70мм"
                }
                return bot.sendMessage(chatId, "Який Ви бажаєте склопакет?", OPTIONS.windowsOptions.step4)
            }
            case "85mm": {
                CHAT_STORE.order.window = {
                    ...CHAT_STORE.order.window,
                    orderStep: 4,
                    profile: "85мм"
                }
                return bot.sendMessage(chatId, "Який Ви бажаєте склопакет?", OPTIONS.windowsOptions.step4)
            }
            case "difference": {
                return bot.sendMessage(chatId, "*Пояснення різниці*", OPTIONS.windowsOptions.step4WithoutDifference)
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

                return bot.sendMessage(chatId, "Бажаєте залишити коментар чи побажання?", OPTIONS.botOptions.wishes)
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

                return bot.sendMessage(chatId, "Бажаєте залишити коментар чи побажання?", OPTIONS.botOptions.wishes)
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

                return bot.sendMessage(chatId, "Бажаєте залишити коментар чи побажання?", OPTIONS.botOptions.wishes)
            }
            default: return null
            }
        }

        switch (data) {
        case "ourServices": {
            return bot.sendMessage(chatId, "Послуги, які ми надаємо", OPTIONS.botOptions.services)
        }
        case "cancel": {
            return bot.sendMessage(chatId, "Послуги, які ми надаємо", OPTIONS.botOptions.services)
        }
        case SERVICES.metalPlasticConstructions.callbackData: {
            return bot.sendMessage(chatId, "Металопластикові конструкції", OPTIONS.botOptions.metalPlasticConstructions)
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

            await bot.sendMessage(chatId, "Оберіть вінко з представлених нижче (вiд 1 до 16)")
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