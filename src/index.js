<<<<<<< HEAD
import WebSocket from 'ws';
import { config } from "dotenv";
config({ override: true });

const ws = new WebSocket("wss://gateway.discord.gg/?v=10&encoding=json");

ws.on('message', (data) => console.log("[WebSocket] Message Received: %s", JSON.parse(data)));
ws.on("ping", (data) => console.log("[WebSocket] Pinged! %s", data));
ws.on("pong", (data) => console.log("[WebSocket] Ponged! %s", data));

ws.on("open", () => {
  ws.send(JSON.stringify({
    "op": 2,
    "d": {
      "token": process.env.TOKEN,
      "properties": {
        "os": "linux",
        "browser": "disco",
        "device": "disco"
      },
      "large_threshold": 250,
      "shard": [0, 1],
      "presence": {
        "activities": [
          {
            "name": "Cards Against Humanity",
            "type": 0
          }
        ],
        "status": "dnd",
        "since": 91879201,
        "afk": false
      },
      // This intent represents 1 << 0 for GUILDS, 1 << 1 for GUILD_MEMBERS, and 1 << 2 for GUILD_BANS
      // This connection will only receive the events defined in those three intents
      "intents": 7
    }
  }));
});

ws.on("close", (code, reason) => console.log("[WebSocket] Connection closed | Code: %s, Reason: %s", code, reason));
ws.on("upgrade", (request) => console.log("8WebSocket] Upgraded. | Request: %s", request));
=======
>>>>>>> 77d4dab1907cb17467c22bee0d92ec0c5f2e6a2a
