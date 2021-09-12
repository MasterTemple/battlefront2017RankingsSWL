module.exports = async (client) => {
    return new Promise(async(resolve, reject) => {

        let players = require('./../../data/playerData.json')
        players[0].league = "Kyber" //changes MAX to Kyber
        let ranks = require('./../../data/ranks.json')

        let {MessageEmbed} = require('discord.js')
        let embedMap = {}
        ranks.forEach((eachRank) => {
            embedMap[eachRank.league] = new MessageEmbed()
            .setColor(eachRank.color)
            .setTitle(eachRank.league.toUpperCase())
            .setThumbnail(eachRank.imageUrl)
            .setDescription("")
        })

        let rankRoles = {}
        ranks.forEach((eachRank) => {
            rankRoles[eachRank.league] = eachRank.roleId
        })

        for(let player of players){
            embedMap[player.league].setDescription(`${embedMap[player.league].description}**${player.rank}.** <@${player.ID}>\n`)
        }

        let embeds = Object.values(embedMap)
        embeds.shift() // removes the MAX league
        let { leaderboardChannelId } = require('./../../data/config.json')

        let messages = await client.channels.cache.get(leaderboardChannelId).messages.fetch()
        
        if(messages.size === 0){
            await client.channels.cache.get(leaderboardChannelId).send({embeds: embeds})
        }else{
            await messages.first().edit({embeds: embeds})

        }

        resolve()
    })

}