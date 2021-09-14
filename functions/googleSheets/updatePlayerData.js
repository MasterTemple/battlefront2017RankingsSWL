module.exports = async() => {
    return new Promise(async(resolve, reject) => {

        
        const { GoogleSpreadsheet } = require('google-spreadsheet')
        const creds = require('./../../data/creds.json')
        const fs = require('fs')
        const doc = new GoogleSpreadsheet('1MJLybB_wugeYsh3u1OyBRYCWNC1eJzHVJybJknagbqc')
        const ranks = require('./../../data/ranks.json')
        await doc.useServiceAccountAuth({
            client_email: creds.client_email,
            private_key: creds.private_key,
        });

        await doc.loadInfo()

        const sheet = doc.sheetsByTitle['RawData']

        await sheet.loadCells()

        let row = 1
        let players = []

        do {
            players.push({
                Name : sheet.getCell(row, 0)._rawData.formattedValue,
                ID : sheet.getCell(row, 1)._rawData.formattedValue,
                MMR : sheet.getCell(row, 2)._rawData.formattedValue,
                Wins : sheet.getCell(row, 3)._rawData.formattedValue,
                Losses : sheet.getCell(row, 4)._rawData.formattedValue,
                Platform : sheet.getCell(row, 5)._rawData.formattedValue,
                Played : sheet.getCell(row, 6)._rawData.formattedValue,
                Win : sheet.getCell(row, 7)._rawData.formattedValue,
            })
            row++
        }while((sheet.getCell(row, 4)._rawData.formattedValue != null))

        players.sort((a, b) => {
            return b.MMR - a.MMR
        })

        let numberOfPlayers = players.length

        players.forEach((eachPlayer, index) => {
            let playerPercentage = Math.floor((index+1)/numberOfPlayers*100)

            let lowerPercentage = 0
            let playerLeague = ranks.find( (eachRank) => {
                return lowerPercentage < playerPercentage && playerPercentage <= eachRank.percent
            })



            let league = playerLeague?.league
            players[index] = {
                ...eachPlayer,
                rank: (index + 1).toString(),
                league: league
            }


        })

        fs.writeFileSync('./data/playerData.json', JSON.stringify(players, null, 2))

        // ranks[0].percent = Math.floor((1/players.length)*100)
        // fs.writeFileSync('./data/ranks.json', JSON.stringify(ranks, null, 2))

        resolve()
    })
}