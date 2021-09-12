module.exports = async (interaction) => {
    let user = interaction.options.get('player')?.value || interaction.user.id

    let playerData = require('./../../data/playerData.json')
    let ranks = require('./../../data/ranks')

    let player = playerData.find(player => player.ID === user)

    let colors = {
        "Kyber": "#1abc9c",
        "Diamond": "#9b59b6",
        "Gold": "#f1c40f",
        "Silver": "#95a5a6",
        "Bronze": "#a84300",
    }
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