module.exports = async (client) => {
    return new Promise(async (resolve, reject) => {
        let { guildId } = require('./../../data/config.json')
        let guild = await client.guilds.cache.get(guildId)
        let role = guild.roles.cache.get("887031792194977842")
        
        let colors = [
            "#dd0000",
            "#dd8b00",
            "#ddcd00",
            "#00dd16",
            "#0077dd",
            "#a500dd",
        ]
        let previousColor = `#${role.color.toString(16)}`
        let index = colors.indexOf(previousColor) + 1
        if(index === colors.length) index = 0

        await role.setColor(colors[index])
    })
}