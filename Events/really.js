/* 
Réagit si des mots de la liste reallyList.json sont trouvés dans chaque message envoyé.
Le bot reprends le mot trouvé entre guillemets et affiche un gif représentant une déception.
WIP: pour chaque correspondance, 
*/
const { Events, EmbedBuilder } = require('discord.js');
const { words } = require('./reallyList.json')
const { klipyApiKey } = require('../config.json');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;
        const sentence = message.content.toLowerCase().split(/\s+/);
        for(const word of words){
            const found = sentence.find(f => f.includes(word));
            if(found){
                gif = await fetch("https://api.klipy.com/api/v1/TVwY0L8Miwootj7MARl0IdC4R19imf7fy7yfyv7U7hMpkkQigTkHSFJ3Ju4HpfgZ/gifs/search?page=1&per_page=50&q=unimpressed&customer_id={customer_id}&locale={country_code}&content_filter={content_filter}");
                gif = await gif.json();
                gif = gif.data.data[Math.floor(Math.random() * gif.data.data.length)].file.hd.gif.url;
                message.channel.reply({ 
                    embeds: [
                        new EmbedBuilder()
                        .setColor(0xFF0090)
                        .setTitle("\""+found+"\"")
                        .setImage(gif)
                    ]
                })
                .catch(console.log("Erreur lors de la réponse."));
            }
        }
    }
}

