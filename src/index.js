import { Client } from './base/client/Client.js';
const client = new Client().login();

client.once("ready", () => console.log("Ready!"));

client.on("message", console.log);