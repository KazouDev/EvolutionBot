"use strict";

const Client = require("discord.js/src/client/Client");

const EventHandler = require("./events/EventHandler");
const CommandHandler = require("./commands/CommandHandler");

const discord = require("discord.js");
const fs = require("fs");

/**
 * Client's base class.
 * @extends {Client}
 */
class Evolution extends Client {

    /**
     * Client's constructor.
     * @param {discord.js} discord
     * @param {Client} Bot 
     */
    constructor(){
        super();

        // Connect the bot with its token:
        this.login(this.getPrivateData("token"));

        // Create instance of EventHandler and CommandHandler:
        new EventHandler(this);
        new CommandHandler(this);
    }

    /**
     * Get private data information in configuration.
     * @param {string} information
     * @return {string}
     */
    getPrivateData(information){
        const data = JSON.parse(fs.readFileSync("./resources/privateAcces.json", "utf8"));

        if(data[information]){
            return data[information];
        } else {
            console.log("Error: " + information + " is undefined privateAcces.json, client stopped.");
            this.destroy();
        }
    }

    sendSimpleEmbed(channel, description){
        if(!channel instanceof discord.Channel) return;

        const embed = new discord.RichEmbed().setColor("#FF0101");

        if(typeof description === "string"){
            channel.send(embed.setDescription(description));
        } else {
            channel.send(embed.setDescription(":x: Une erreur c'est produite lors de la création du message."));
        }  
    }
}

module.exports = Evolution;