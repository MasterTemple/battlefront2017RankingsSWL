module.exports = async (client) => {
    return new Promise(async(resolve, reject) => {

        let players = require('./../../data/playerData.json')
        let ranks = require('./../../data/ranks.json')

        let members = await client.guilds.cache.get(guildId).members.fetch()
        let rankRoles = {}

        ranks.forEach((eachRank) => {
            rankRoles[eachRank.league] = eachRank.roleId
        })

        for(let player of players){

            let member = members.get(player.ID)
            let currentRoles = [...member.roles.cache.keys()]

            for(let eachRankRole of Object.values(rankRoles)){

                if(currentRoles.includes(eachRankRole)){
                    await member.roles.remove(eachRankRole)
                }

            }
            await member.roles.add(rankRoles[player.league])
        }
        resolve()
    })

}