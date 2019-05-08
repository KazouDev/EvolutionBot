"use strict";

const discord = require("discord.js");
const fs = require("fs");

/**
 * Combine's class.
 */
class Combine {

    /**
     * When a user execute a command.
     * @param {Evolution} client 
     * @param {Message} message 
     * @param {array} args
     */
    execCmd(client, message, args){
        var usage =  "Usage: " + client.prefix + "combine [@membre] [# Clash Of Clan]";

        if(args.length < 2) return client.sendSimpleEmbed(message.channel, usage);

        if(!message.mentions.members.first()) return client.sendSimpleEmbed(message.channel, usage);

        var userid = message.mentions.members.first().id;

        if(!args[1].startsWith("#")) return client.sendSimpleEmbed(message.channel, usage);
        
        let comb = JSON.parse(fs.readFileSync("./resources/combine.json"));

        if(comb[userid]){
            client.sendSimpleEmbed(message.channel, "Error: Ce joueurs à déjà un id de relier avec son compte (" + client.getMemberTag(userid) + ").");
        } else {
            comb[userid] = {
                "tag": args[1]
            }
            
            client.writeJson("combine", comb);
            client.sendSimpleEmbed(message.channel, message.mentions.members.first().username + " à était associé au tag " + args[1] + " avec succés !");
        }
        
    }
}

module.exports = Combine;