const Discord = require("discord.js"),
    client = new Discord.Client();
require('discord-reply');
const db = require("quick.db");
const id = require('../Settings/idler.json')
const ayar = require('../Settings/config.json')

module.exports = {
    name: 'jail',
    aliases: [],
    async execute(client, message, args) {

        if (!message.member.hasPermission('MANAGE_ROLES') && !message.member.roles.cache.get(id.Jail.jailyetkiliid) && message.author.id !== ayar.sahip) return message.lineReply('`Bu komudu kullanmak için gerekli izinlere sahip değilsin!`').then(x => x.delete({ timeout: 3000 }), message.react(id.Emojiler.başarısızemojiid));

        let üye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let sebep = args.slice(1).join(' ');

        if (!üye || !sebep) return message.lineReply('`Jaile atabilmek için üye ve sebep belirtmelisin!`').then(x => x.delete({ timeout: 3000 }));
        if (üye.roles.cache.get(id.Jail.jailrolid)) return message.lineReply('`Etiketlenen üye zaten jailde!`').then(x => x.delete({ timeout: 3000 }));
        if (message.member.roles.highest.position <= üye.roles.highest.position) return message.lineReply('`Etiketlediğin kullanıcı senden üst veya senle aynı pozisyonda!`').then(x => x.delete({ timeout: 3000 }))

        let roller = üye.roles.cache
        db.push(`üye.${üye.id}.sicil`, { Yetkili: message.author.id, Tip: "JAIL", Sebep: sebep, Zaman: Date.now() }), db.set(`üye.${üye.id}.roller`, roller);

        client.channels.cache.get(id.Jail.jaillogkanalid).send(new Discord.MessageEmbed().setColor('#00ff66').setDescription(`${üye}\`(${üye.id})\` adlı üye, <@${message.author.id}>\`(${message.author.id})\` üyesi tarafından \`(${new Date().toTurkishFormatDate()})\` zamanında \`(${sebep})\` sebebiyle jaile atıldı.`))
        message.lineReply('`Etiketlenen üye başarıyla jaile atıldı!`').then(x => x.delete({ timeout: 9000 }), message.react(id.Emojiler.başarılıemojiid))
      return üye.roles.cache.has('988767836484800566') ? üye.roles.set(['988767836484800566', '937389228193632300']) : üye.roles.set(['1026930714131845281'])
        
      
    }
} 