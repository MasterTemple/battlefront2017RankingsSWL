module.exports = async (interaction) => {
    let user = interaction.options.get('player')?.value || interaction.user.id

    let playerData = require('./../../data/playerData.json')
    let ranks = require('./../../data/ranks')

    let player = playerData.find(player => player.ID === user)
    
    let colors = {}

    ranks.forEach((eachRank) => {
        colors[eachRank.league] = eachRank.color
    })

    let {MessageEmbed} = require('discord.js')
    let embed = new MessageEmbed()

    try{

        embed.setColor(colors[player.league])

        embed.setTitle(`#${player.rank}. ${player.Name}`)
        

        embed.setThumbnail(ranks.find(f=>f.league===player.league).imageUrl)
        embed.addField("Platform", player.Platform, true)
        embed.addField("MMR", player.MMR, true)
        embed.addField("League", player.league, true)
        embed.addField("Wins", player.Wins, true)
        embed.addField("Losses", player.Losses, true)
        embed.addField("Win Rate", player.Win, true)

        await interaction.reply({embeds: [embed]})

    }catch(e){
        console.log(e);
        await interaction.reply({content:"The user selected is unranked for this season.", ephemeral:true})
    }
}