"use strict";

const ClanInfo = require("../../ClanInfo");

const discord = require("discord.js");
const fs = require("fs");

let comb = JSON.parse(fs.readFileSync("./resources/combine.json"));

/**
 * Player's class.
 */
class Player {

    /**
     * When a user execute a command.
     * @param {Evolution} client 
     * @param {Message} message 
     * @param {array} args
     */
    execCmd(client, message, args){
        switch(args[0]){
            default:
                client.sendSimpleEmbed(message.channel, "Syntaxe: " + client.prefix + "player combine [@mention] [#idCoC]\nSyntaxe: " + client.prefix + "player info [@mention]");
                client.sendSimpleEmbed(message.channel, "Syntaxe: !player combine <mention> <id CoC>\nSyntaxe: !player info <mention>");
            break;
        
            case "combine":
                const usage = "Faites " + client.prefix + "player combine [@mention] [#IdCoc]";

                if(args.length < 3) return client.sendSimpleEmbed(message.channel, usage);
                if(!message.mentions.members.first()) return client.sendSimpleEmbed(message.channel, usage);
                if(!args[2].startsWith("#")) return client.sendSimpleEmbed(message.channel, usage);

                const userid = message.mentions.members.first().id;
                
                client.requestClashOfClansApi("clans/" + ClanInfo.clanID, function(response){
                    response.memberList.forEach(element => {
                        if(element.tag === args[2]){
                            comb[userid] = {
                                "name": element.name,
                                "tag": args[2]
                            }

                            client.writeJson("combine", comb);

                            return client.sendSimpleEmbed(message.channel, message.mentions.members.first().user.username + " à était associé au tag " + args[1] + " avec succés !");
                        }
                    });

                    return client.sendSimpleEmbed(message.channel, "Aucun membre du clan ne posséde ce tag, vérifie le."); //TODO: fix that.
                });
            break;

            case "info":
                if(args.length < 2) return client.sendSimpleEmbed(message.channel, "Syntaxe: !player info <mention>");
            
                if(message.mentions.members.first()){
                    if(!comb[message.mentions.members.first().id]) return client.sendSimpleEmbed(message.channel, "Ce joueurs n'est pas combiné.");
                    var search = comb[message.mentions.members.first().id].tag;
                } else {
                    var search = args[1];
                }

                client.requestClashOfClansApi("players/" + search.replace("#", "%23"), function(response){
                    if(response === 404){
                        return client.sendSimpleEmbed(message.channel, "Cet id n'existe pas.");
                    }

                    const embed = new discord.RichEmbed().setColor(client.defaultColor)

                    embed.setTitle("Information de " + response.name);
                    embed.addField("Tag", response.tag);
                    embed.addField("HDV", response.townHallLevel);
                    embed.addField("MDO", response.builderHallLevel);
                    embed.addField("Niveaux", response.expLevel);
                    embed.addField("Trophés", response.trophies);
                    embed.addField("HDV", response.townHallLevel);

                    response.heroes.forEach(element => {
                        embed.addField(client.traductHeroes(element.name), element.level + "/" + element.maxLevel);
                    })

                    embed.setImage(response.league.iconUrls.medium);

                    message.channel.send(embed);
                });
            break;
        }       
    } 
}

module.exports = Player;