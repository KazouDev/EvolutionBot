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
        const usage = "Faites " + client.prefix + "combine [@mention] [#IdCoc]";

        if(args.length !== 2) return client.sendSimpleEmbed(message.channel, usage);
        if(!message.mentions.members.first()) return client.sendSimpleEmbed(message.channel, usage);
        if(!args[1].startsWith("#")) return client.sendSimpleEmbed(message.channel, usage);

        const userid = message.mentions.members.first().id;
        let comb = JSON.parse(fs.readFileSync("./resources/combine.json"));
        
        client.requestClashOfClansApi("clans/22CGY098C", function(response){
            response.memberList.forEach(element => {
                if(element.tag === args[1]){

                    comb[userid] = {
                        "name": element.name,
                        "tag": args[1]
                    }
                    
                    console.log(comb);
                    
                    client.writeJson("combine", comb);

                    return client.sendSimpleEmbed(message.channel, message.mentions.members.first().user.username + " à était associé au tag " + args[1] + " avec succés !");
                }
            });

            return client.sendSimpleEmbed(message.channel, "Aucun membre du clan ne posséde ce tag, vérifie le.");
        });
    } 
}

module.exports = Combine;