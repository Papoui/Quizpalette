const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('stats').setDescription('Affiche les stats du nombre de mots répétés.'),
	async execute(interaction) {
		
	},
};