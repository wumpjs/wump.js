export interface FooterObject {
  text: string;
  iconURL: string;
  proxyIconURL: string;
}

export interface ImageObject {
  url: string;
  proxyURL: string;
  height: number;
  width: number;
}

export interface ProviderObject {
  name: string;
  url: string;
}

export interface AuthorObject {
  name: string;
  url: string;
  iconURL: string;
  proxyIconURL: string;
}

export interface FieldObject {
  name: string;
  value: string;
  inline: boolean;
}

export interface ThumbnailObject extends ImageObject {

}

export interface VideoObject extends ImageObject {

}