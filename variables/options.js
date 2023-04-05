const SERVICES = require("./services")

const botOptions = {
    welcome: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: "Наші послуги", callback_data: "ourServices" }],
            ]
        })
    },
    services: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: SERVICES.metalPlasticConstructions.text, callback_data: SERVICES.metalPlasticConstructions.callbackData }, { text: SERVICES.interiorDoor.text, callback_data: SERVICES.interiorDoor.callbackData }],
                [{ text: SERVICES.protectiveShutters.text, callback_data: SERVICES.protectiveShutters.callbackData }, { text: SERVICES.rollerBlinds.text, callback_data: SERVICES.rollerBlinds.callbackData }],
                [{ text: SERVICES.other.text, callback_data: SERVICES.other.callbackData }],
            ]
        })
    },
    metalPlasticConstructions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: SERVICES.metalPlasticConstructions.types.windows.text, callback_data: SERVICES.metalPlasticConstructions.types.windows.callbackData }, { text: SERVICES.metalPlasticConstructions.types.doors.text, callback_data: SERVICES.metalPlasticConstructions.types.doors.callbackData }],
                [{ text: SERVICES.metalPlasticConstructions.types.partitions.text, callback_data: SERVICES.metalPlasticConstructions.types.partitions.callbackData }, { text: SERVICES.metalPlasticConstructions.types.mosquitoNets.text, callback_data: SERVICES.metalPlasticConstructions.types.mosquitoNets.callbackData }],
                [{ text: SERVICES.metalPlasticConstructions.types.doubleGlazedWindows.text, callback_data: SERVICES.metalPlasticConstructions.types.doubleGlazedWindows.callbackData }],
            ]
        })
    },
    cancel: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: "Повернутися назад", callback_data: "cancel" }],
            ]
        })
    },
    wishes: {
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
                [{ text: "60мм", callback_data: "60mm" }, { text: "70мм", callback_data: "70mm" }, { text: "85мм", callback_data: "85mm" }],
                [{ text: "Що таке профиль?", callback_data: "profile" }],
            ]
        })
    },
    step3WithoutProfile: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: "60мм", callback_data: "60mm" }, { text: "70мм", callback_data: "70mm" }, { text: "85мм", callback_data: "85mm" }]
            ]
        })
    },
    step4: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: "Однокамерний", callback_data: "oneСhamber" }, { text: "Двокамерний", callback_data: "twoСhamber" }, { text: "Трикамерний", callback_data: "threeСhamber" }],
                [{ text: "В чому різниця?", callback_data: "difference" }],
            ]
        })
    },
    step4WithoutDifference: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: "Однокамерний", callback_data: "oneСhamber" }, { text: "Двокамерний", callback_data: "twoСhamber" }, { text: "Трикамерний", callback_data: "threeСhamber" }]
            ]
        })
    }
}

const OPTIONS = {
    botOptions,
    windowsOptions,
}

module.exports = OPTIONS