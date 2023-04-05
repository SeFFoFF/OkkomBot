const TelegramApi = require("node-telegram-bot-api")
require("dotenv").config()
const TOKEN = process.env.TELEGRAM_API_TOKEN
const bot = new TelegramApi(TOKEN, { polling: true })

const fetch = require("node-fetch")

const MANAGERS = require("./variables/managers")
const COMMANDS = require("./variables/commands")
const SERVICES = require("./variables/services")
const OPTIONS = require("./variables/options")

let CHAT_STORE = {
    isOtherOption: false,
    requestToManager: {
        text: "",
        phoneNumber: ""
    },
    order: {
        whatIsOrdered: "",
        window: {
            orderStep: null,
            type: null, // 1-16 from image
            sizes: {
                width: 0,
                height: 0
            },
            profile: 0, // 60mm, 70mm, 85mm
            doubleGlazedWindows: "", // однокамерний, двокамерний, трикамерний
        }
    },
    wishes: {
        isReadyToWishes: false,
        isActive: false,
        wishesText: ""
    }
}

const request = async (chatId, username) => {
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

        return bot.sendMessage(chatId, "Запит прийнят, незабаром з Вами зв'яжеться наш менеджер!", OPTIONS.botOptions.welcome)
    } catch (error) {
        return bot.sendMessage(chatId, "Помилка, запит не надіслано, спробуйте пізніше", OPTIONS.botOptions.welcome)
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

        if (!CHAT_STORE.isOtherOption || CHAT_STORE.order.window.orderStep === null) {
            if (text === COMMANDS.start.command) {
                return bot.sendMessage(chatId, "Вас вітає бот компанії ОККОМ! ПРОДОЛЖЕНИЕ ТЕКСТА...", OPTIONS.botOptions.welcome)
            }

            if (text === COMMANDS.services.command) {
                return bot.sendMessage(chatId, "Нижче наведені послуги, які ми надаємо", OPTIONS.botOptions.services)
            }

            // return bot.sendMessage(chatId, "Кх-кхм, не розумію про що ти... Вибери одну із запропонованих мною команд")
        }
    })

    bot.on("message", async (msg) => {
        const text = msg.text
        const chatId = msg.chat.id
        const username = msg.chat.username

        if (CHAT_STORE.wishes.isActive) {
            if (text[0] === "/") return bot.sendMessage(chatId, "Помилка, у запиті не можна використовувати команди бота")

            CHAT_STORE.wishes = {
                ...CHAT_STORE.wishes,
                wishesText: text
            }

            await request(chatId, username)
        }

        if (CHAT_STORE.isOtherOption) {
            if (text[0] === "/") return bot.sendMessage(chatId, "Помилка, у запиті не можна використовувати команди бота")

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
            if (text[0] === "/") return bot.sendMessage(chatId, "Помилка, у запиті не можна використовувати команди бота")

            switch (CHAT_STORE.order.window.orderStep) {
            case 1: {
                if (text < 1 || text > 16) return bot.sendMessage(chatId, "Помилка, оберіть вінко від 1 до 16")

                CHAT_STORE.order.window = {
                    ...CHAT_STORE.order.window,
                    orderStep: 2,
                    type: Number(text)
                }

                return bot.sendMessage(chatId, "Введіть ширину вікна (см)")
            }
            case 2: {
                if (text < 1) return bot.sendMessage(chatId, "Помилка, введіть правильне значення")

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

                return bot.sendMessage(chatId, "Чекаємо на твій коментар!")
            } else {
                await request(chatId, username)
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
            return bot.sendMessage(chatId, "Пслуги, які ми надаємо", OPTIONS.botOptions.services)
        }
        case SERVICES.metalPlasticConstructions.callbackData: {
            return bot.sendMessage(chatId, "Металопластикові конструкції", OPTIONS.botOptions.metalPlasticConstructions)
        }
        case SERVICES.metalPlasticConstructions.types.windows.callbackData: {
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
            CHAT_STORE = {
                ...CHAT_STORE,
                isOtherOption: true
            }
            return bot.sendMessage(chatId, "Залишіть будь ласка ваше повідомлення і наш менеджер з Вами зв'яжеться", OPTIONS.botOptions.cancel)
        }
        default: return undefined
        }
    })
}

start()