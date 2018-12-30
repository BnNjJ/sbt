const discord = require('discord.js');
const client = new discord.Client();
require('events').EventEmitter.defaultMaxListeners = Infinity;
const fs = require('fs');



const prefix = '~';
const ownerID = '482925833535619083';

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

});

client.on('ready',() => console.log('Launched!'));
client.login(process.env.BOT_TOKEN);
