module.exports = async(client) => {
    return new Promise (async (resolve, reject) => {
        await client.application.commands.set([
            {
                name: 'rank',
                description: 'Get the rank of a player!',
                default_permission: true,
                options: [
                    {
                        name: "player",
                        description: "Enter a player. Leave blank for your own rank.",
                        type: 6,
                        required: false
                    }
                ]
            },
        ])
        resolve()
    })
}