const discord = require('discord.js');
const client = new discord.Client();
require('events').EventEmitter.defaultMaxListeners = Infinity;
const fs = require('fs');
let xp = require("./xp.json");



const prefix = '~';
const ownerID = '';

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);
  
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0 ){
      console.log("Couldn't find commands!");
      return;
    };
    jsfile.forEach((f, i) => {
      let props = require(`./commands/${f}`);
      console.log(`${i + 1}: ${f} loaded!`);
    });
  });
client.on('ready', () => {
    client.user.setStatus('online')
    client.user.setActivity('~help', {type: 'Watching'})

});


client.on('message', message =>{
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    try {

        delete require.cache[require.resolve(`./commands/${cmd}.js`)];
        let ops = {
            ownerID: ownerID
        }
        let commandFIle = require(`./commands/${cmd}.js`);
        commandFIle.run(client, message, args, ops);

    } catch (e) {
        console.log(e.stack);
    }

    let xpAdd = Math.floor(Math.random() * 7) + 8;
    console.log(xpAdd);
  
    if(!xp[message.author.id]){
      xp[message.author.id] = {
        xp: 0,
        level: 1
      };
    }
  
  
    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nxtLvl = xp[message.author.id].level * 300;
    xp[message.author.id].xp =  curxp + xpAdd;
    if(nxtLvl <= xp[message.author.id].xp){
      xp[message.author.id].level = curlvl + 1;
      let lvlup = new Discord.RichEmbed()
      .setTitle("Level Up!")
      .setColor(purple)
      .addField("New Level", curlvl + 1);
  
      message.channel.send(lvlup).then(msg => {msg.delete(5000)});
    }
    fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
      if(err) console.log(err)
    });

});

client.on('ready',() => console.log('Launched!'));
client.login(process.env.BOT_TOKEN);
