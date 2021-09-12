const Discord = require('discord.js')
let config = require('./data/config.json')


let updatePlayers = require('./functions/googleSheets/updatePlayerData')
let updateRoles = require('./functions/discord/updateRoles')

let cron = require('node-cron');

const client = new Discord.Client({
    presence: {
        status: 'online',
        activities: [
            {
                name: "Star Wars Leagues",
                type: 'STREAMING',
                url: 'https://www.twitch.tv/directory/game/Star%20Wars%20Battlefront%20II'
            }
        ],
    },
    intents: ['GUILD_MESSAGES', 'DIRECT_MESSAGES', 'GUILDS', 'GUILD_MEMBERS']
})

client.login(config.token)

client.once('ready', async () => {
    await updatePlayers()

    console.log(`${client.user.username} is fully operational`)
})

client.on('interactionCreate', async (interaction) => {
    
    if (interaction.type === 'APPLICATION_COMMAND') {

        let command = require(`./functions/slashCommands/${interaction.commandName}`)
        command(interaction)
    }

})

cron.schedule(`*/30 * * * *`, async() => {
    try{
        await updatePlayers()
        await updateRoles(client)

    }catch{}
});