"use strict";

const EventHandler = require("./events/EventHandler");

/**
 * Client's base class.
 */
class Evolution {

    /**
     * Client's constructor.
     * @param {discord.js} discord
     * @param {Client} Bot 
     */
    constructor(discord, Bot){
        this.discord = discord;
        this.Bot = Bot;

        new EventHandler(Bot);
    }
}