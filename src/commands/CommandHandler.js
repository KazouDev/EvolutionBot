"use strict";

/**
 * CommandHandler allows you to launch events.
 */
class CommandHandler {

    /**
     * CommandHandler's constructor, this is used for start different commands.
     * @param {Evolution} client
     */
    constructor(client){
        client.on("message", message => {
            if(!message.content.startsWith(client.prefix)) return;

            const commandsInstances = Array("Help", "Evolution", "Participe", "Test", "Player");

            const commands = commandsInstances.map(function(element){
                return element.toLowerCase();
            });
            
            const args = message.content.slice(client.prefix.length).trim().split(" ");
            const cmd = args.shift().toLowerCase();
    
            if(commands.indexOf(cmd) !== -1){
                if(message.channel.type === "dm") return;
            
                const classOfCommand = commandsInstances.find(function(element){
                    if(element.toLowerCase() === cmd){
                        return element;
                    }
                });

                const commandClass = require("./list/" + classOfCommand + ".js");
    
                new commandClass().execCmd(client, message, args);
            } else {
                client.sendSimpleEmbed(message.channel, "Cette commande n'existe pas, tu peux faire **" + client.prefix + "help** pour vois la liste des commandes disponible.");
            }
        });
    }
}

module.exports = CommandHandler;