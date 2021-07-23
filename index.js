const db = require("quick.db");
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
const fetch = require("node-fetch");
const fs = require("fs");
require("express")().listen(1343);

//meth geldi come on mannnn

const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log("Pinglenmedi.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


client.on("ready", () => {
  console.log("Bot Aktif");
  let playing = client.voice.connections.size;

  client.user.setActivity('Methman in the future!')
  
});

setInterval(() => {
  var links = db.get("linkler");
  if (!links) return;
  var linkA = links.map(c => c.url);
  linkA.forEach(link => {
    try {
      fetch(link);
    } catch (e) {
      console.log("" + e);
    }
  });
  console.log("Bot açıldı agaaaa.");
}, 60000);

client.on("ready", () => {
  if (!Array.isArray(db.get("linkler"))) {
    db.set("linkler", []);
  }
});


const help = new discord.MessageEmbed()
.setFooter("Meth ❤️ Uptime")
.setColor("RED")
.setDescription('!ekle komutu ile botunu uptime edebilirsin. ')



const göster = new discord.MessageEmbed()
.setFooter("Meth ❤️ Uptime")
.setColor("RED")
.setDescription('${db.get("linkler").length} \n projeyi aktif tutuyorum!')

const zatenvar = new discord.MessageEmbed()
.setFooter("Meth ❤️ Uptime")
.setColor("RED")
.setDescription('Bu link zaten var! Eğer yoksa Methman#1000 e ulaş!');


const eklendi = new discord.MessageEmbed()
.setFooter("Meth ❤️ Uptime")
.setColor("RED")
.setDescription('Link başarı ile eklendi!');

const meth31 = new discord.MessageEmbed()
.setFooter("Meth ❤️ Uptime")
.setColor("RED")
.setDescription('Link girmezsen neyi uptime edeceğim?');

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!ekle") {
    var link = spl[1];
    fetch(link)
      .then(() => {
        if (
          db
            .get("linkler")
            .map(z => z.url)
            .includes(link)
        )
             return message.channel.send(zatenvar);
        message.channel.send(eklendi);
        db.push("linkler", { url: link, owner: message.author.id });
      })
      .catch(e => {
        return message.channel.send(meth31);
      });
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!göster") {
    var link = spl[1];
    message.channel.send(göster);
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!yardım") {
    var link = spl[1];
    message.channel.send(help);
  }
});


client.login('TOKEN YAZ LAN');

// discord.gg/davet gelmeyi unutmayın! 
// Methman#1000 tarafından yapıldı. Başka yerlerde paylaşmayınız!
