const Discord = require ("discord.js");
const config = require("../config.json");
const categoryID = config.CategoryID;

module.exports.run = async (client, message, args) => {
  message.delete();

  const embed = new Discord.RichEmbed()
    .setColor(0xddddd)
    .setDescription(`You already have a ticket open! If this is incorrect, please contact a staff member immediately!`)
    .setTimestamp()
   .setFooter(`HammerLock ©`);

  const embed3 = new Discord.RichEmbed()
    .setColor(0xddddd)
    .setDescription("Thank you for reaching our support team! A member of our support team will be with you soon!")
    .setTimestamp()
   .setFooter(`HammerLock ©`);

  let user1 = message.author.username.toLowerCase()
  if (message.guild.channels.exists(`name`, `ticket-${user1}-${message.author.discriminator}`)) {
    message.channel.send(embed)
    return
  }

  message.guild.createChannel(`ticket-${message.author.username}-${message.author.discriminator}`).then(async c => {
    c.setParent(categoryID);
    let supportrole = message.guild.roles.find(`name`, `Support Team`)
    if(!supportrole) return message.channel.send("The support role doesn't exist! Please create a role called **Support Team**");
    c.overwritePermissions(message.guild.defaultRole, {
      VIEW_CHANNEL: false,
      SEND_MESSAGES: false
    })
    c.overwritePermissions(message.member, {
      VIEW_CHANNEL: true,
      SEND_MESSAGES: true
    })
    c.overwritePermissions(supportrole, {
      VIEW_CHANNEL: true,
      SEND_MESSAGES: true
    })

    const embed2 = new Discord.RichEmbed()
    .setColor(0x00000)
    .setDescription(`Your ticket has been created! Visit your ticket at ${c}`)
    .setTimestamp()
    .setFooter(`HammerLock ©`);

    message.channel.send(embed2)

    c.send(embed3)
  })

}
module.exports.help = {
	name: "new"
}
