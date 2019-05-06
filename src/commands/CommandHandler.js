"use strict";

const prefix = "!";

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
            if(!message.content.startsWith(prefix)) return;

            const commandsInstances = Array("Help");

            const commands = commandsInstances.map(function(element){
                return element.toLowerCase();
            });
            
            const args = message.content.slice(prefix.length).trim().split(" ");
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
                //TODO: embed ????
                return message.channel.send("Hum... Désolé, cette commande n'existe pas :yum:");
            }
        });
    }
}

module.exports = CommandHandler;