"use strict";

const discord = require("discord.js");
const fs = require("fs");

var usage =  "Usage: " + client.prefix + "combine <@member> <tag Clash of Clan>";

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
        client.sendSimpleEmbed(message.channel, "Cette commmande est en développement...");

        if(args.length < 2) return message.channel.send(usage);

        if(!message.mentions.member.first) return message.channel.send(usage);
        
        let comb = JSON.parse(fs.readFileSync("./resources/combine.json"));

        
        
    }
}

module.exports = Combine;