const COMMANDS = require("../variables/commands")
const OPTIONS = require("../variables/options")
const MANAGERS = require("../variables/managers")

const showOrders = require("../orders/showOrders")

const botOnCommands = (bot, CHAT_STORE) => {
    bot.on("message", async (msg) => {
        const text = msg.text
        const chatId = msg.chat.id

        if (CHAT_STORE.botState.action === "MENU") {
            if (!CHAT_STORE.botState.isUserManager && (chatId === MANAGERS.okkom || chatId === 335150059)) {
                CHAT_STORE.botState = {
                    ...CHAT_STORE.botState,
                    isUserManager: true
                }
                await bot.sendMessage(chatId, "Ви увійшли з облікового запису менеджера", OPTIONS.botOptions.managerKeyboard)
            }

            if (CHAT_STORE.botState.isUserManager && text === "Переглянути замовлення") {
                await showOrders(bot, chatId)
            }

            if (text === COMMANDS.start.command) {
                const text = `Хочете зробити своє житло ще більш комфортним та стильним? ОККОМ допоможе вам втілити ваші мрії в реальність! З досвідом більше 10 років у галузі, як дилер заводу ${"Steko"}, ми гарантуємо вам якісні вікна, рулонні штори, двері та захисні ролети, які не тільки покращать естетику вашого дому, а й забезпечать його комфорт і безпеку.\n\nНаші майстри-консультанти завжди готові допомогти вам з вибором оптимального варіанту, залежно від вашого бюджету та потреб. І найкраще з усього - ми забезпечуємо швидку доставку та встановлення, щоб ви могли насолоджуватись новими зручностями якомога швидше.\n\nА ще, ви можете бути впевнені в якості наших послуг, оскільки ми не лише продаємо продукти, а й займаємось їх ремонтом та обслуговуванням. ОККОМ - ваш надійний партнер у зміні вашого житла на краще!`

                await bot.sendMessage(chatId, text, { parse_mode: "HTML" })
                return bot.sendMessage(chatId, "Щоб використовувати бота, натискайте на запропоновані кнопки", OPTIONS.botOptions.welcome)
            }

            if (text === COMMANDS.services.command) {
                return bot.sendMessage(chatId, "Нижче наведені послуги, які ми надаємо", OPTIONS.botOptions.servicesWithMarkup)
            }

            // return bot.sendMessage(chatId, "Кх-кхм, не розумію про що ти... Вибери одну із запропонованих мною команд", OPTIONS.botOptions.services)
        }
    })
}

module.exports = botOnCommands