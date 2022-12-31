import WebSocket, { WebSocketServer } from 'ws';
import { Base64 } from 'base64-string';
// other code
const enc = new Base64();
import { blue, yellow, bold, underline } from "colorette"
import config from '../../config.json' assert { type: "json" };
let { prefix, discordSocketUrl, pkgName} = config;

const ws = new WebSocket(discordSocketUrl, {
  perMessageDeflate: false
});
//this.ws = ws;
ws.on('open', function open() {
   ws.send(JSON.stringify({
    "op": 2,
    "d": {
      "token": process.env.TOKEN,
      "properties": {
        "os": "linux",
        "browser": pkgName,
        "device": pkgName
      },
      "compress": false,
      "large_threshold": 250,
      "shard": [0, 1],
      "presence": {
        "activities": [{
          "name": "Default Wumpjs bot",
          "type": 0
        }],
        "status": "dnd",
        "since": 91879201,
        "afk": false
      },
      // This intent represents 1 << 0 for GUILDS, 1 << 1 for GUILD_MEMBERS, and 1 << 2 for GUILD_BANS
      // This connection will only receive the events defined in those three intents
      "intents": 7
    }
  }));
  console.log(`${bold(prefix)} Connected to ${underline(yellow('Socket'))} Server.`)
});
ws.on('close', function close() {
 console.log(`${bold(prefix)} Disconnected from ${underline(yellow('Socket'))} Server.`)
});
ws.on("ping", function ping(data) {
    console.log(`${bold(prefix)} Pong! ${data}`)
});
ws.on('message', function message(data) {
   
  console.log(`${bold(prefix)} Received ${underline(blue(data))} from Discord's Gateway.`);
});