/**
 * @readonly
 */
export default {
  title: null,
  type: "rich",
  description: null,
  url: null,
  timestamp: null,
  color: null,
  footer: { text: null, icon: null, proxyIcon: null },
  image: { url: null, proxy: null, height: 512, width: 512 },
  thumbnail: { url: null, proxy: null, height: 512, width: 512 },
  video: { url: null, proxy: null, height: 512, width: 512 },
  provider: { name: null, url: null },
  author: { name: null, url: null, icon: null, proxyIcon: null },
  fields: [{ name: null, value: null, inline: false }]
};

export const FooterObject = { text: null, icon: null, proxyIcon: null };
export const ImageObject = { url: null, proxy: null, height: 512, width: 512 };
export const ThumbnailObject = ImageObject;
export const VideoObject = ThumbnailObject;
export const ProviderObject = { name: null, url: null };
export const AuthorObject = { name: null, url: null, icon: null, procyIcon: null };
export const FieldObject = { name: null, value: null, inline: false };