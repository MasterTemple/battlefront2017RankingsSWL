module.exports = async (client) => {
    return new Promise(async(resolve, reject) => {

        let players = require('./../../data/playerData.json')
        let members = await client.guilds.cache.get(guildId).members.fetch()
        let rankRoles = {
            "Kyber": "ID",
            "Diamond": "ID",
            "Gold": "ID",
            "Silver": "ID",
            "Bronze": "ID",
        }

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