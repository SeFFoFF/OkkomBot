const OPTIONS = require("../variables/options")

const getWindowOrder = async(bot, CHAT_STORE, data, form) => {
    if (data === "profile") {
        const text = "Профіль - головний елемент будь-якого вікна. Від нього залежить якість і довговічність металопластикової конструкції.\nПрофілі Steko виробляються з української і європейського сировини. Вони екологічно безпечні і довговічні. Не жовтіють і не лопаються з плином часу.\n\n60мм:\nтеплоізоляція 7/10\nшумоізоляція 5/10\n\n70мм:\nтеплоізоляція 8/10\nшумоізоляція 7/10\n\n85мм:\nтеплоізоляція 9/10\nшумоізоляція 7/10\n"

        await bot.editMessageText(text, form)
        return bot.editMessageReplyMarkup(OPTIONS.windowsOptions.step3WithoutProfile, form)
    }

    if (data === "difference") {
        const text = "Склопакети Steko - це конструкції, що складаються з двох, трьох або чотирьох поверхонь високоякісного скла.\nВони перешкоджають втраті тепла і помітно скорочують ваші витрати на опалення.\n\n1-камерний:\nтеплоізоляція 2/8\nшумоізоляція 3/8\n\n2-камерний:\nтеплоізоляція 3/8\nшумоізоляція 4/8\n\n3-камерний:\nтеплоізоляція 4/8\nшумоізоляція 5/8"

        await bot.editMessageText(text, form)
        return bot.editMessageReplyMarkup(OPTIONS.windowsOptions.step4WithoutDifference, form)
    }

    if (data === "60мм" || data ===  "70мм" || data ===  "85мм") {
        CHAT_STORE.order.window = {
            ...CHAT_STORE.order.window,
            orderStep: 4,
            profile: data
        }
        await bot.editMessageText("Який Ви бажаєте склопакет?", form)
        return bot.editMessageReplyMarkup(OPTIONS.windowsOptions.step4, form)
    }

    if (data === "oneСhamber" || data === "twoСhamber" || data === "threeСhamber") {
        const doubleGlazedWindows = data === "oneСhamber" ? "Однокамерний" :
            data === "twoСhamber" ? "Двокамерний" :
                data === "threeСhamber" ? "Трикамерний" : undefined

        CHAT_STORE.order = {
            ...CHAT_STORE.order,
            whatIsOrdered: "window"
        }

        CHAT_STORE.order.window = {
            ...CHAT_STORE.order.window,
            orderStep: null,
            doubleGlazedWindows
        }

        CHAT_STORE.order = {
            ...CHAT_STORE.order,
            isReadyToPhoneNumber: true
        }

        return  bot.editMessageText("Введіть Ваш номер телефону", form)
    }
}

module.exports = getWindowOrder