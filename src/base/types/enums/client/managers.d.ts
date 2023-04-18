import EventEmitter from "node:events";
import * as Enums from "./enums";
import WebSocket from "ws";

export class WebSocketManager extends EventEmitter {
    constructor(client: any);
    readonly Events: Enums.ClientEvents; readonly Client: any; protected readonly ws: WebSocket;
    readonly status: Enums.ClientStatus; protected sequence: number;

    /**
     * Create new Gateway URL.
     * 
     * @param version Gateway version. Default = 10.
     * @param compress Compression setting. Default = false.
     */
    protected createGatewayURL(version?: number, compress?: boolean): string;
    /**
     * Send payload to Gateway.
     * @param payload Payload object.
     */
    public send(payload: object): void;
    /**
     * Connect to Gateway.
     */
    public connect(): void;
    /**
     * Send heartbeat
     * @param time Heartbeat Interval in seconds
     */
    public heartbeat(time: number): NodeJS.Timer;
    /**
     * Get bot gateway.
     */
    protected fetchGateway(): void;
}
