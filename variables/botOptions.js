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
    }
}

module.exports = botOptions