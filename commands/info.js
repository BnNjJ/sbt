const Discord = require('discord.js');

exports.run = async (client, message, args, ops) => {


    let clientembed = new Discord.RichEmbed()
        .setDescription("Bot Information")
        .setColor("#15f153")
        .addField("Bot Name", 'Hammerlock')
        .addField("Created On", '26 Dec 2018')
        .addField("Created by", 'Flyz#0007');

    return message.channel.send(clientembed);
    
};