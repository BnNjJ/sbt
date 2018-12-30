const Discord = require('discord.js');

exports.run = async (client, message, args, ops) => {


    let clientembed = new Discord.RichEmbed()
        .setDescription("List of commands")
        .setColor("#11111")
        .addField("~info", 'show bot info')
        .addField("~poll", 'create a suggestion')
        .addField("~new", 'create a ticket')
        .addField("~close", 'close a ticket')
        .addField("~add", 'add another person to the ticket')
        .addField("~remove", 'remove a person from the ticket');

    return message.channel.send(clientembed);
    
};