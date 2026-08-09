const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client){
        console.log(`Ready! Logged in as ${client.user.tag}`);
        client.channels.fetch('1534311309578076210')
        .then(channel => channel.send("Chialade"))
        .catch("Channel invalide");
    }
}