const Discord = require('discord.js');

exports.run = async (client, message, args, ops) => {

    // Check for input
    if (!args[0]) return message.channel.send('Proper usage: ~poll Question');
    
    // Create Embed
    const embed = new Discord.RichEmbed()
        .setColor(0xddddd)
        .setFooter('React to Vote.')
        .setDescription(args.join(' '))
        .setTitle(`Poll Created By ${message.author.username}`);
        
    let msg = await message.channel.send(embed)
        .then(function (msg) {
            msg.react("✅");
            msg.react("❌");
            message.delete({timeout: 1});
            }).catch(function(error) {
            console.log(error);
        });
};