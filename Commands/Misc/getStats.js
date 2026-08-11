const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
			.setName('getStats')
			.setDescription('Affiche les stats du nombre de mots répétés.'),
	async execute(interaction) {
		
	},
};