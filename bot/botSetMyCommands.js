const COMMANDS = require("../variables/commands")

const botSetMyCommands = (bot) => {
    return bot.setMyCommands([
        { command: COMMANDS.start.command, description: COMMANDS.start.description },
        { command: COMMANDS.services.command, description: COMMANDS.services.description },
    ])
}

module.exports = botSetMyCommands