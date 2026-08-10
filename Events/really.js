/* 
Réagit si des mots de la liste reallyList.json sont trouvés dans chaque message envoyé.
Le bot reprends le mot trouvé entre guillemets et affiche un gif représentant une déception.
WIP: pour chaque correspondance, 
*/
const { Events, EmbedBuilder } = require('discord.js');
const { words: wordList } = require('./reallyList.json')
const { klipyApiKey } = require('../config.json');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;
        const sentence = message.content.toLowerCase().split(/\s+/);
        const foundWordsList = [];
        for (const word of wordList) {
            foundWordsList.push(...sentence.filter(f => f.includes(word)).map(foundWord => ({ word, foundWord })));
        }
            
        if(foundWordsList.length>0){
            const list = [...new Set(foundWordsList.map(item => item.foundWord))].join(", ");
            gif = await fetch(`https://api.klipy.com/api/v1/${klipyApiKey}/gifs/search?page=1&per_page=50&q=unimpressed&customer_id={customer_id}&locale={country_code}&content_filter={content_filter}`);
            gif = await gif.json();
            gif = gif.data.data[Math.floor(Math.random() * gif.data.data.length)].file.hd.gif.url;
            message.reply({ 
                embeds: [
                    new EmbedBuilder()
                    .setColor(0xFF0090)
                    .setTitle("\""+list+"\"")
                    .setImage(gif)
                ]
            })
        }
    }
}

