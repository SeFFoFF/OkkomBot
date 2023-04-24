const OPTIONS = require("../variables/options")

const getMosquitoNetsOrder = async(bot, CHAT_STORE, chatId, data, form) => {
    if (CHAT_STORE.order.mosquitoNets.orderStep === 1) {
        const type = data === "external" ? "Зовнішня" :
            data === "internal" ? "Внутрішня" :
                data === "door" ? "Дверна" : undefined

        CHAT_STORE.order.mosquitoNets = {
            ...CHAT_STORE.order.mosquitoNets,
            orderStep: 2,
            type
        }

        await bot.editMessageText("Який колір Ви бажаєте?", form)
        return bot.editMessageReplyMarkup(OPTIONS.mosquitoNetsOptions.step2, form)
    }

    if (CHAT_STORE.order.mosquitoNets.orderStep === 2) {
        CHAT_STORE.order = {
            ...CHAT_STORE.order,
            whatIsOrdered: "mosquitoNets"
        }

        const color = data === "white" ? "Білий" :
            data === "anthracite" ? "Антрацит" :
                data === "goldenOak" ? "Золотий дуб" :
                    data === "nut" ? "Горіх" :
                        data === "darkOak" ? "Темний дуб" : undefined

        CHAT_STORE.order.mosquitoNets = {
            ...CHAT_STORE.order.mosquitoNets,
            orderStep: 3,
            color
        }

        return bot.sendMessage(chatId, "Введіть ширину конструкції в см (наприклад: 175 чи 180.5)")
    }
}

module.exports = getMosquitoNetsOrder