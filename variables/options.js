const SERVICES = require("./services")

const botOptions = {
    welcome: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: "Наші послуги", callback_data: "ourServices" }],
            ]
        })
    },
    managerKeyboard: {
        reply_markup: JSON.stringify({
            keyboard: [
                [{ text: "Переглянути замовлення", callback_data: "orders" }]
            ]
        })
    },
    servicesWithMarkup: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: SERVICES.metalPlasticConstructions.text, callback_data: SERVICES.metalPlasticConstructions.callbackData }],
                [{ text: SERVICES.interiorDoor.text, callback_data: SERVICES.interiorDoor.callbackData }],
                [{ text: SERVICES.protectiveShutters.text, callback_data: SERVICES.protectiveShutters.callbackData }],
                [{ text: SERVICES.rollerBlinds.text, callback_data: SERVICES.rollerBlinds.callbackData }],
                [{ text: SERVICES.support.text, callback_data: SERVICES.support.callbackData }],
                [{ text: "Наш сайт", web_app: { url: "https://okkom.com.ua/" } }],
            ]
        })
    },
    services: {
        inline_keyboard: [
            [{ text: SERVICES.metalPlasticConstructions.text, callback_data: SERVICES.metalPlasticConstructions.callbackData }],
            [{ text: SERVICES.interiorDoor.text, callback_data: SERVICES.interiorDoor.callbackData }],
            [{ text: SERVICES.protectiveShutters.text, callback_data: SERVICES.protectiveShutters.callbackData }],
            [{ text: SERVICES.rollerBlinds.text, callback_data: SERVICES.rollerBlinds.callbackData }],
            [{ text: SERVICES.support.text, callback_data: SERVICES.support.callbackData }],
            [{ text: "Наш сайт", web_app: { url: "https://okkom.com.ua/" } }],
        ]
    },
    metalPlasticConstructions: {
        inline_keyboard: [
            [{ text: SERVICES.metalPlasticConstructions.types.windows.text, callback_data: SERVICES.metalPlasticConstructions.types.windows.callbackData }, { text: SERVICES.metalPlasticConstructions.types.doors.text, callback_data: SERVICES.metalPlasticConstructions.types.doors.callbackData }],
            [{ text: SERVICES.metalPlasticConstructions.types.partitions.text, callback_data: SERVICES.metalPlasticConstructions.types.partitions.callbackData }, { text: SERVICES.metalPlasticConstructions.types.mosquitoNets.text, callback_data: SERVICES.metalPlasticConstructions.types.mosquitoNets.callbackData }],
            [{ text: SERVICES.metalPlasticConstructions.types.doubleGlazedWindows.text, callback_data: SERVICES.metalPlasticConstructions.types.doubleGlazedWindows.callbackData }, { text: "<< Назад", callback_data: "cancel" }],
        ]
    },
    metalPlasticConstructionsWithMarkup: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: SERVICES.metalPlasticConstructions.types.windows.text, callback_data: SERVICES.metalPlasticConstructions.types.windows.callbackData }, { text: SERVICES.metalPlasticConstructions.types.doors.text, callback_data: SERVICES.metalPlasticConstructions.types.doors.callbackData }],
                [{ text: SERVICES.metalPlasticConstructions.types.partitions.text, callback_data: SERVICES.metalPlasticConstructions.types.partitions.callbackData }, { text: SERVICES.metalPlasticConstructions.types.mosquitoNets.text, callback_data: SERVICES.metalPlasticConstructions.types.mosquitoNets.callbackData }],
                [{ text: SERVICES.metalPlasticConstructions.types.doubleGlazedWindows.text, callback_data: SERVICES.metalPlasticConstructions.types.doubleGlazedWindows.callbackData }, { text: "<< Назад", callback_data: "cancel" }],
            ]
        })
    },
    cancel: {
        inline_keyboard: [
            [{ text: "<< Назад", callback_data: "cancel" }],
        ]
    },
    cancelWithMarkup: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: "<< Назад", callback_data: "cancel" }],
            ]
        })
    },
    wishes: {
        inline_keyboard: [
            [{ text: "Так", callback_data: "yes" }, { text: "Нi", callback_data: "no" }],
        ]
    },
    wishesWithMarkup: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: "Так", callback_data: "yes" }, { text: "Нi", callback_data: "no" }],
            ]
        })
    }
}

const windowsOptions = {
    step1: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: "Я не знаю розмір", callback_data: "unknownSize" }]
            ]
        })
    },
    step3: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: "60мм", callback_data: "60мм" }, { text: "70мм", callback_data: "70мм" }, { text: "85мм", callback_data: "85мм" }],
                [{ text: "Що таке профиль?", callback_data: "profile" }],
            ]
        })
    },
    step3WithoutProfile: {
        inline_keyboard: [
            [{ text: "60мм", callback_data: "60мм" }, { text: "70мм", callback_data: "70мм" }, { text: "85мм", callback_data: "85мм" }]
        ]
    },
    step4: {
        inline_keyboard: [
            [{ text: "Однокамерний", callback_data: "oneСhamber" }],
            [{ text: "Двокамерний", callback_data: "twoСhamber" }],
            [{ text: "Трикамерний", callback_data: "threeСhamber" }],
            [{ text: "В чому різниця?", callback_data: "difference" }],
        ]
    },
    step4WithoutDifference: {
        inline_keyboard: [
            [{ text: "Однокамерний", callback_data: "oneСhamber" }],
            [{ text: "Двокамерний", callback_data: "twoСhamber" }],
            [{ text: "Трикамерний", callback_data: "threeСhamber" }],
        ]
    }
}

const mosquitoNetsOptions = {
    step1: {
        inline_keyboard: [
            [{ text: "Зовнішня", callback_data: "external" }, { text: "Внутрішня", callback_data: "internal" }, { text: "Дверна", callback_data: "door" }],
            [{ text: "<< Назад", callback_data: "cancel" }],
        ]
    },
    step2: {
        inline_keyboard: [
            [{ text: "Білий", callback_data: "white" }, { text: "Антрацит", callback_data: "anthracite" }, { text: "Золотий дуб", callback_data: "goldenOak" }],
            [{ text: "Горіх", callback_data: "nut" }, { text: "Темний дуб", callback_data: "darkOak" }]
        ]
    },
}

const OPTIONS = {
    botOptions,
    windowsOptions,
    mosquitoNetsOptions
}

module.exports = OPTIONS