/* 
Réagit si des mots de la liste reallyList.json sont trouvés dans chaque message envoyé.
Le bot reprends le mot trouvé entre guillemets et affiche un gif représentant une déception.

WIP: pour chaque correspondance, on ajoute le nombre de mots trouvés au compteur de chaque joueur
dans la base database.db
*/
const { Events, EmbedBuilder } = require('discord.js');
const { words: wordList } = require('./reallyList.json')
const { klipyApiKey } = require('../config.json');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;
        const sentence = message.content.toLowerCase().split(/\s+/);

        // On essaie de trouver une correspondance avec les mots dans reallyList.json
        
        const foundWordsList = [];
        for (const word of wordList) {
            /* 
                Si correspondance, on ajoute une paire{word, foundWord} à foundWordsList.
                word == mot dans la liste, foundWord == mot récupéré dans le message.

                Exemple: message = "ceci est un test mdrrrr" 
                -> word == 'mdr', foundWord = 'mdrrrr'
            */
            foundWordsList.push(...sentence.filter(f => f.includes(word)).map(foundWord => ({ word, foundWord })));
        }

        // S'il n'y a pas de correspondance(foundWordsList.length==0) alors on ne fait rien

        if(foundWordsList.length>0){

            // Réponse à la phrase avec l'attribut foundWord des paires dans foundWordsList

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

