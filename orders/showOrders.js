const readData = require("../utils/readData")
const formatDate = require("../utils/formatDate")

const showOrders = async (bot, chatId) => {
    const loadJsonFile = async() => {
        try {
            return readData("db/orders.json")
        } catch (err) {
            console.error("fileRead error:", err)
        }
    }

    const orders = await loadJsonFile()

    if (orders.length) {
        const text = orders.length < 5 ? `Всього ${orders.length} замовленя` : `Всього ${orders.length} замовлень`

        await bot.sendMessage(chatId, text, { parse_mode: "HTML" })

        for (const order of orders) {
            let message = ""

            switch (order.whatIsOrdered) {
            case "window": {
                if (order.wish)
                    message = `Дата замовлення: <b>${formatDate(new Date(order.date))}</b>\nЗамовник: <b>@${order.username}</b>\nНомер телефону: <b>${order.phoneNumber}</b>\n_________________________________\nВікно №<b>${order.type}</b>\nРозміри: ширина <b>${order.sizes.width}см</b>, висота <b>${order.sizes.height}см</b>\nПрофіль: <b>${order.profile}</b>\nСклопакет: <b>${order.doubleGlazedWindows}</b>\n_________________________________\nКоментар: <b>${order.wish}</b>`
                else
                    message = `Дата замовлення: <b>${formatDate(new Date(order.date))}</b>\nЗамовник: <b>@${order.username}</b>\nНомер телефону: <b>${order.phoneNumber}</b>\n_________________________________\nВікно №<b>${order.type}</b>\nРозміри: ширина <b>${order.sizes.width}см</b>, висота <b>${order.sizes.height}см</b>\nПрофіль: <b>${order.profile}</b>\nСклопакет: <b>${order.doubleGlazedWindows}</b>\n_________________________________`
                break
            }
            case "mosquitoNets": {
                if (order.wish)
                    message = `Дата замовлення: <b>${formatDate(new Date(order.date))}</b>\nЗамовник: <b>@${order.username}</b>\nНомер телефону: <b>${order.phoneNumber}</b>\n_________________________________\nМоскітна сітка: <b>${order.type}</b>\nРозміри: ширина <b>${order.sizes.width}см</b>, висота <b>${order.sizes.height}см</b>\nКолір: <b>${order.color}</b>\n_________________________________\nКоментар: <b>${order.wish}</b>`
                else
                    message = `Дата замовлення: <b>${formatDate(new Date(order.date))}</b>\nЗамовник: <b>@${order.username}</b>\nНомер телефону: <b>${order.phoneNumber}</b>\n_________________________________\nМоскітна сітка: <b>${order.type}</b>\nРозміри: ширина <b>${order.sizes.width}см</b>, висота <b>${order.sizes.height}см</b>\nКолір: <b>${order.color}</b>\n_________________________________`
                break
            }
            default: return null
            }

            await bot.sendMessage(chatId, message, { parse_mode: "HTML" })
        }
    } else return bot.sendMessage(chatId, "Поки що немає замовлень", { parse_mode: "HTML" })
}

module.exports = showOrders