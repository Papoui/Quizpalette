/* 
Réagit si des mots de la liste reallyList.json sont trouvés dans chaque message envoyé.
Le bot reprends le mot trouvé entre guillemets et affiche un gif représentant une déception.

Pour chaque correspondance, on ajoute le nombre de mots trouvés au compteur de chaque joueur
dans la base database.db
*/
const { Events, EmbedBuilder } = require('discord.js');
const { words: wordList } = require('./reallyList.json');
const { klipyApiKey } = require('../config.json');
const { DatabaseSync } = require('node:sqlite');
const path = require('path');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;
        if (message.content.toLowerCase().endsWith("quoi") 
            || message.content.toLowerCase().endsWith("quoient")
            || message.content.toLowerCase().endsWith("quoi ?")
            || message.content.toLowerCase().endsWith("quoient ?")){
                message.reply({ 
                embeds: [
                    new EmbedBuilder()
                    .setColor(0xFF0090)
                    .setTitle("feur")
                ]
            })
            }
    }
}

