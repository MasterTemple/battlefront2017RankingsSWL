const Discord = require('discord.js')
let config = require('./data/config.json')


let updatePlayers = require('./functions/googleSheets/updatePlayerData')
let updateRoles = require('./functions/updateRoles')

let add_commands = require('./functions/add_commands')
let cron = require('node-cron');

const client = new Discord.Client({
    presence: {
        status: 'online',
        activities: [
            {
                name: config.bot_status,
                type: 'STREAMING',
                url: 'https://www.twitch.tv/directory/game/Star%20Wars%20Battlefront%20II'
            }
        ],
    },
    intents: ['GUILD_MESSAGES', 'DIRECT_MESSAGES', 'GUILDS', 'GUILD_MEMBERS']
})

client.login(config.token)

client.once('ready', async () => {
    // update_rankings()
    console.log(`${config.bot_name} v${parseFloat(config.version).toFixed( 1)} is fully operational`) //logs that the bot is ready

    await add_commands(client)
    // await client.guilds.cache.get("863167431506001970").commands.set([])
    // console.log('done')
    // update_roles(client)

})

client.on('interactionCreate', async (interaction) => {
    
    if (interaction.type === 'APPLICATION_COMMAND') {

        let command = require(`./functions/slashCommands/${interaction.commandName}`)
        command()
    }

})

cron.schedule(`*/30 * * * *`, async() => {
    try{
        await updatePlayers()
        await updateRoles(client, config)

    }catch{}
});