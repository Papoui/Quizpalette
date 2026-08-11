const { SlashCommandBuilder, EmbedBuilder, MessageFlags } = require('discord.js');
const { DatabaseSync } = require('node:sqlite');
module.exports = {
	data: new SlashCommandBuilder()
			.setName('stats')
			.setDescription('Affiche les stats du nombre de mots répétés.')
			.addUserOption((option) => option.setName('pseudo').setDescription('Pseudo du joueur dont on veut récupérer les stats.')),
	async execute(interaction) {
		const user = interaction.options.getUser('pseudo') ?? interaction.user;

		const database = new DatabaseSync('./database.db');
		const isInDb = database.prepare(`SELECT 1 FROM user WHERE userId = ?`).get(user.id);
		let description = "Pas de données pour l'utilisateur.";
		if(isInDb){

			let stats = database.prepare(`
						SELECT 
							SUM(mdr) as mdr,
							SUM(ptdr) as ptdr,
							SUM(jure) as jure,
							SUM(jpp) as jpp,
							SUM(pitié) as pitie,
							SUM("0fsee") as "0fsee"
						FROM user
						WHERE userId = ?
						`).get(user.id);
					
			description = 
				`Mdr : ${stats.mdr}\n` +
				`Ptdr : ${stats.ptdr}\n` +
				`Jure : ${stats.jure}\n` +
				`Jpp : ${stats.jpp}\n` +
				`Pitié : ${stats.pitie}\n` +
				`0fsee : ${stats['0fsee']}`
			;
		}

		interaction.reply({ 
			embeds: [
				new EmbedBuilder()
				.setColor(0xFF0090)
				.setTitle(`Stats de ${user.username}`)
				.setDescription(`${description}`)
			]
		})
	},
};