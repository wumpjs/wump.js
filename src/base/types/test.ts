import * as Enums from "./enums/client/enums";
import * as Managers from "./enums/client/managers";
import { Intents } from "./enums/bitfields/intents";
import { ColorObject as ColorEnum, Color as EmbedColor } from "./enums/other/color";
declare namespace test {

  ///             < CLASSES >

  abstract class BaseBuilder<DataType = any> {
    constructor(data: DataType);
    static version: string; private data: DataType;
  }

  export class Client<ClientEvents extends Enums.ClientEvents = Enums.ClientEvents> {
    constructor(token?: string, options?: ClientOptions);
    readonly Events: ClientEvents; readonly options: ClientOptions;
    readonly defaultOptions: ClientOptions; private token: string;
    private ws: Managers.WebSocketManager;

    /**
     * Set bot token.
     * @param secret Token of the bot.
     */
    public setToken(secret: string): Client;
    
    /**
     * Get bot token.
     */
    public fetchToken(): string;

    /**
     * Set client options.
     */
    public setOptions(options: ClientOptions): Client;
  }

  /**
   * Embed Builder
   */
  export class Embed extends BaseBuilder<EmbedObject> {
    constructor(data: EmbedObject);
    /**
     * Set the title of the embed.
     * @param title Title of the embed
     */
    public setTitle(title: string): Embed;
    /**
     * Set type of the embed.
     * @param type Embed type. 
     */
    protected setType(type: EmbedType): Embed;
    /**
     * Set description of the embed.
     * @param content Description of the embed.
     */
    public setDescription(content: string): Embed;
    /**
     * Set url of the embed.
     * @param target URL of the embed.
     */
    public setURL(target: string): Embed;
    /**
     * Set timestamp of the embed.
     * @param time Timestamp of the embed.
     */
    public setTimestamp(time?: number): Embed;
    /**
     * Set color of the embed.
     * @param color Color of the embed.
     */
    public setColor(color: EmbedColor | string): Embed;
    /**
     * Set footer of the embed.
     * @param options Footer of the embed.
     */
    public setFooter(options: EmbedFooter): Embed;
    /**
     * Set image of the embed.
     * @param image Image of the embed.
     */
    public setImage(options: EmbedImage): Embed;
    /**
     * Set thumbnail of the embed.
     * @param options Thumbnail of the embed.
     */
    public setThumbnail(options: EmbedThumbnail): Embed;
    /**
     * Set fields of the embed
     * @param fields Fields of the embed.
     */
    public setFields(...fields: EmbedField[]): Embed;
    /**
     * Set author of the embed.
     * @param options Author of the embed.
     */
    public setAuthor(options: EmbedAuthor): Embed;
    /**
     * Set video of the embed.
     * @param options Video of the embed.
     */
    protected setVideo(options: EmbedVideo): Embed;
    /**
     * Set provider of the embed.
     * @param options Provider of the embed.
     */
    protected setProvider(options: EmbedProvider): Embed;
    /**
     * Converts the Embed object to an API-Readable Object.
     */
    public toJSON(): EmbedObject;
  }

  ///               < TYPES >

  export type ClientBrowser = "Edge" | "Chrome" | "Firefox" | "Opera";
  export type ClientDevice = "Computer" | "Mobile Device";//benimde aklima geldi
  export type ClientOS = "Linux" | "Windows" | "MacOS";
  export type ClientStatus = "online" | "dnd" | "idle" | "invisible" | "offline";
  export type ExcludeEnum<T, K extends keyof T> = Exclude<keyof T | T[ keyof T ], K | T[ K ]>;
  export type EmbedType = "rich"; // ekleyin buna

  ///             < INTERFACES >

  export interface WebhookObject {
    id: number; type: number;
    guildID: number; channelId: number;
    user: "userobjesi"; name: string;
    avatar: "avatarobjesi"; token: string;
    applicationId: number; source_guild: number;
    source_channel: number; url: string;
  }

  export interface EmbedObject {
    fields: EmbedField[]; url: string; timestamp: number; color: string;
    footer: EmbedFooter; image: EmbedImage; thumbnail: EmbedThumbnail;
    video: EmbedVideo; provider: EmbedProvider; author: EmbedAuthor;
    title: string; type: EmbedType; description: string;
  }

  export interface EmbedFooter {
    text: string; icon: string; proxyIcon: string;
  }

  export interface EmbedImage {
    url: string; proxy: string;
    height: number; width: number;
  }

  export interface EmbedThumbnail {
    url: string; proxy: string;
    height: number; width: number;
  }

  export interface EmbedVideo {
    url: string; proxy: string;
    height: number; width: number;
  }

  export interface EmbedProvider {
    name: string; url: string;
  }

  export interface EmbedAuthor {
    name: string; url: string;
    icon: string; proxyIcon: string;
  }

  export interface EmbedField {
    name: string; value: string; inline: boolean;
  }

  export interface ButtonObject {
    type: number; style: number; url: string;
    label: string; emoji: string; customId: string;
  }

  export interface RowObject {
  }

  export interface ClientProperties {
    browser: ClientBrowser; device: ClientDevice; os: ClientOS;
  }

  export interface AllowedMentions {
    parse: string[], users: boolean; roles: boolean;
  }

  export interface ClientWebSocket {
    compress?: boolean; large_thresold?: number; version?: number;
  }

  export interface ClientPresence {
    activities: ClientActivity[]; status: ClientStatus;
  }

  export interface ClientActivity {
    name: string; url: string; shardId: number | readonly number[];
    type: ExcludeEnum<typeof ClientActivityType, "CUSTOM">;
  }

  export interface ClientOptions {
    failIfNotExists: boolean; intents: number[] | string[],
    partials: string[], shards: number; shardCount: number;
    closeTimeout: number; waitGuildTimeout: number; allowedMentions: AllowedMentions;
    properties: ClientProperties; ws: ClientWebSocket; presence: ClientPresence;
  }

  ///             < ENUMS >
  export enum ClientActivityType {
    // unuttuğum varsa yazın
    PLAYING = 0,
    STREAMING = 1,
    LISTENING = 2,
    WATCHING = 3,
    CUSTOM = 4,
    COMPETING = 5
  }
}



