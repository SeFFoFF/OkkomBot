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
                await sendData(bot, CHAT_STORE, chatId, username, CHAT_STORE.order.whatIsOrdered)
            }
        }

        if (CHAT_STORE.order.window.orderStep) {
            switch (data) {
            case "profile": {
                const text = "Профіль - головний елемент будь-якого вікна. Від нього залежить якість і довговічність металопластикової конструкції.\nПрофілі Steko виробляються з української і європейського сировини. Вони екологічно безпечні і довговічні. Не жовтіють і не лопаються з плином часу.\n\n60мм:\nтеплоізоляція 7/10\nшумоізоляція 5/10\n\n70мм:\nтеплоізоляція 8/10\nшумоізоляція 7/10\n\n85мм:\nтеплоізоляція 9/10\nшумоізоляція 7/10\n"

                await bot.editMessageText(text, form)
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
                const text = "Склопакети Steko - це конструкції, що складаються з двох, трьох або чотирьох поверхонь високоякісного скла.\nВони перешкоджають втраті тепла і помітно скорочують ваші витрати на опалення.\n\n1-камерний:\nтеплоізоляція 2/8\nшумоізоляція 3/8\n\n2-камерний:\nтеплоізоляція 3/8\nшумоізоляція 4/8\n\n3-камерний:\nтеплоізоляція 4/8\nшумоізоляція 5/8"

                await bot.editMessageText(text, form)
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

        if (CHAT_STORE.order.mosquitoNets.orderStep) {
            switch (data) {
            case "external": {
                CHAT_STORE.order.mosquitoNets = {
                    ...CHAT_STORE.order.mosquitoNets,
                    orderStep: 2,
                    type: "Зовнішня"
                }

                await bot.editMessageText("Який колір Ви бажаєте?", form)
                return bot.editMessageReplyMarkup(OPTIONS.mosquitoNetsOptions.step2, form)
            }
            case "internal": {
                CHAT_STORE.order.mosquitoNets = {
                    ...CHAT_STORE.order.mosquitoNets,
                    orderStep: 2,
                    type: "Внутрішня"
                }

                await bot.editMessageText("Який колір Ви бажаєте?", form)
                return bot.editMessageReplyMarkup(OPTIONS.mosquitoNetsOptions.step2, form)
            }
            case "door": {
                CHAT_STORE.order.mosquitoNets = {
                    ...CHAT_STORE.order.mosquitoNets,
                    orderStep: 2,
                    type: "Дверна"
                }

                await bot.editMessageText("Який колір Ви бажаєте?", form)
                return bot.editMessageReplyMarkup(OPTIONS.mosquitoNetsOptions.step2, form)
            }
            case "white": {
                CHAT_STORE.order = {
                    ...CHAT_STORE.order,
                    whatIsOrdered: "mosquitoNets"
                }

                CHAT_STORE.order.mosquitoNets = {
                    ...CHAT_STORE.order.mosquitoNets,
                    orderStep: 3,
                    color: "Білий"
                }

                return bot.sendMessage(chatId, "Введіть ширину конструкції в см (наприклад: 175 чи 180.5)")
            }
            case "anthracite": {
                CHAT_STORE.order = {
                    ...CHAT_STORE.order,
                    whatIsOrdered: "mosquitoNets"
                }

                CHAT_STORE.order.mosquitoNets = {
                    ...CHAT_STORE.order.mosquitoNets,
                    orderStep: 3,
                    color: "Антрацит"
                }

                return bot.sendMessage(chatId, "Введіть ширину конструкції в см (наприклад: 175 чи 180.5)")
            }
            case "goldenOak": {
                CHAT_STORE.order = {
                    ...CHAT_STORE.order,
                    whatIsOrdered: "mosquitoNets"
                }

                CHAT_STORE.order.mosquitoNets = {
                    ...CHAT_STORE.order.mosquitoNets,
                    orderStep: 3,
                    color: "Золотий дуб"
                }

                return bot.sendMessage(chatId, "Введіть ширину конструкції в см (наприклад: 175 чи 180.5)")
            }
            case "nut": {
                CHAT_STORE.order = {
                    ...CHAT_STORE.order,
                    whatIsOrdered: "mosquitoNets"
                }

                CHAT_STORE.order.mosquitoNets = {
                    ...CHAT_STORE.order.mosquitoNets,
                    orderStep: 3,
                    color: "Горіх"
                }

                return bot.sendMessage(chatId, "Введіть ширину конструкції в см (наприклад: 175 чи 180.5)")
            }
            case "darkOak": {
                CHAT_STORE.order = {
                    ...CHAT_STORE.order,
                    whatIsOrdered: "mosquitoNets"
                }

                CHAT_STORE.order.mosquitoNets = {
                    ...CHAT_STORE.order.mosquitoNets,
                    orderStep: 3,
                    color: "Темний дуб"
                }

                return bot.sendMessage(chatId, "Введіть ширину конструкції в см (наприклад: 175 чи 180.5)")
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