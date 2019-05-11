"use strict";

const ClanInfo = require("../../ClanInfo");

const discord = require("discord.js");

/**
 * Evolution's class.
 */
class Evolution {

    /**
     * When a user execute a command.
     * @param {Evolution} client 
     * @param {Message} message 
     * @param {array} args
     */
    execCmd(client, message, args){
        const embed = new discord.RichEmbed().setColor(client.defaultColor);

        const commands = new Map();
        
        commands.set("info", "Obtenir les informations du clan.");
        commands.set("guerre", "Voir le nombre de guerre gagné et perdu, les guerres en cours...");
        commands.set("membres", "Obtenir une liste des membres du clan.");

        client.requestClashOfClansApi("clans/" + ClanInfo.clanID, function(response){
            if(typeof args[0] === "string" && Array.from(commands.keys()).indexOf(args[0]) !== -1){
                embed.setTitle("Evolution - " + args[0].charAt(0).toUpperCase() + args[0].substring(1).toLowerCase());
            } else {
                embed.setTitle("Evolution - Commandes");
            }

            embed.setThumbnail(response.badgeUrls.medium);

            switch(args[0]){
                default:
                    embed.setDescription("Voici la liste des commandes disponibles pour obtenir des informations sur le clan.");

                    Array.from(commands).forEach(function(element){
                        embed.addField(client.prefix + "evolution " + element[0], element[1]);
                    });
                break;

                case "info":
                    embed.setDescription("Bientôt...");
                break;

                case "guerre":
                    embed.addField("Guerre gagné/perdu", response.warWins + "/" + response.warLosses);
                    //TODO: GET /clans/{clanTag}/currentwar
                break;

                case "membres":
                    let leader = Array();
                    let coLeader = Array();
                    let admin = Array();
                    let member = Array();

                    response.memberList.forEach(function(element){
                        switch(element.role){
                            case "leader":
                                leader.push(element.name);
                            break;

                            case "coLeader":
                                coLeader.push(element.name);
                            break;

                            case "admin":
                                admin.push(element.name);
                            break;

                            case "member":
                                member.push(element.name);
                            break;
                        }
                    });
        
                    embed.addField("Chef", leader.join(", ") + ".");
                    embed.addField("Chef Adjoint", coLeader.join(", ") + ".");
                    embed.addField("Ainé", admin.join(", ") + ".");
                    embed.addField("Membre", member.join(", ") + ".");
                break;
            }

            message.channel.send(embed);
        });
    }
}

module.exports = Evolution;