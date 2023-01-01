export class Embed {
  constructor(data = {
    title: null,
    description: null,
    timestamp: null,
    footer: {
      text: null,
      icon: null
    },
    author: {
      content: null,
      icon: null
    },
    thumbnail: {
      url: null
    }
  }) {
    this.data = data;
  };

  setTitle(title = "new Embed!") {
    if (typeof title !== "string") throw new TypeError("Embed title is not string.");

    Object.defineProperty(this.data, "title", title);

    return title;
  };

  setDescription(content = "new Description!") {
    if (typeof content !== "string") throw new TypeError("Embed description is not string.");

    Object.defineProperty(this.data, "description", content);

    return content;
  };

  setThumbnail(url = null) {
    if (typeof url !== "string") throw new TypeError("Embed thumbnail url is not string.");

    Object.defineProperty(this.data, "thumbnail", { url: url });

    return url;
  };

  setImage(url = null) {
    if (typeof url !== "string") throw new TypeError("Embed image url is not string.");

    Object.defineProperty(this.data, "image", { url: url });

    return url;
  };

  setTimestamp() {
    const { footer } = this.data;

    Object.defineProperty(this.data, "timestamp", Math.floor(Date.now() / 1000));
    Object.defineProperty(this.data, "footer", { text: footer.text + " | " + new Date(timestamp).toISOString() });

    return 0;
  };

  toJSON() {
    return JSON.stringify(JSON.parse(this.data));
  };
};