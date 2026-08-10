const { Events } = require('discord.js');
const { words } = require('./reallyList.json')
const { klipyApiKey } = require('../config.json');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (message.author.bot) return;
        const sentence = message.content.toLowerCase().split(/\s+/);
        for(const word of words){
            console.log(word);
            const found = sentence.find(f => f.includes(word));
            if(found){
                response = "\""+found+"\"\n";
                gif = await fetch("https://api.klipy.com/api/v1/TVwY0L8Miwootj7MARl0IdC4R19imf7fy7yfyv7U7hMpkkQigTkHSFJ3Ju4HpfgZ/gifs/search?page=1&per_page=50&q=unimpressed&customer_id={customer_id}&locale={country_code}&content_filter={content_filter}")
                gif = await gif.json();
                response += gif.data.data[Math.floor(Math.random() * gif.data.data.length)].file.hd.gif.url;
                message.channel.send(response);
            }
        }
    }
}

