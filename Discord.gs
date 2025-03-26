/**
 * Represents a Discord Embed object.
 * @class
 */
class Embed {
  /**
   * Creates an instance of Embed.
   * @param {string=} [title=""] - The title of the embed.
   */
  constructor(title = "") {
    this.title = title;
    this.color = 663399; // Default color
    this.fields = [];
  }

  /**
   * Sets the title of the embed.
   * @param {string} title - The title of the embed.
   * @returns {Embed} Returns the instance for method chaining.
   * @throws {Error} Throws an error if the title is not a string.
   */
  setTitle(title) {
    if (typeof title !== "string") throw new Error("Title must be a string.");
    this.title = title;
    return this;
  }

  /**
   * Sets the color of the embed.
   * @param {string|number} color - The color of the embed (hexadecimal or decimal).
   * @returns {Embed} Returns the instance for method chaining.
   * @throws {Error} Throws an error if the color is not a valid string or number.
   */
  setColor(color) {
    if (typeof color !== "string" && typeof color !== "number") throw new Error("Color must be a string or number.");
    this.color = color;
    return this;
  }

  /**
   * Sets the description of the embed.
   * @param {string} description - The description text shown above the fields.
   * @returns {Embed} Returns the instance for method chaining.
   * @throws {Error} Throws an error if the description is not a string.
   */
  setDescription(description) {
    if (typeof description !== "string") throw new Error("Description must be a string.");
    this.description = description;
    return this;
  }

  /**
   * Sets the URL of the embed.
   * @param {string} url - The URL of the embed.
   * @returns {Embed} Returns the instance for method chaining.
   * @throws {Error} Throws an error if the URL is not a string.
   */
  setUrl(url) {
    if (typeof url !== "string") throw new Error("URL must be a string.");
    this.url = url;
    return this;
  }

  /**
   * Adds a single field to the embed.
   * @param {string|Field} fieldTitle - The title of the field or a Field object.
   * @param {string} fieldValue - The value of the field.
   * @param {boolean} [fieldInline=true] - Whether the field should be displayed inline.
   * @returns {Embed} Returns the instance for method chaining.
   * @throws {Error} Throws an error if the field title or value is invalid.
   */
  addField(fieldTitle, fieldValue, fieldInline = true) {
    if (fieldTitle instanceof Field) {
      this.fields.push(fieldTitle);
    } else {
      if (typeof fieldTitle !== "string" || typeof fieldValue !== "string") throw new Error("Field title and value must be strings.");
      this.fields.push(new Field(fieldTitle, fieldValue, fieldInline));
    }
    return this;
  }

  /**
   * Adds multiple fields to the embed.
   * @param {Field[]} fields - An array of fields to add to the embed.
   * @returns {Embed} Returns the instance for method chaining.
   * @throws {Error} Throws an error if the fields are not valid Field objects.
   */
  addFields(fields) {
    if (!Array.isArray(fields)) throw new Error("Fields must be an array.");
    fields.forEach(field => {
      if (!(field instanceof Field)) throw new Error("All fields must be instances of Field.");
    });
    this.fields = this.fields.concat(fields);
    return this;
  }

  /**
   * Sets the footer of the embed.
   * @param {Object} options - Footer options.
   * @param {string} options.footerText - Footer text shown at the bottom of the embed.
   * @param {string} options.footerIconUrl - Footer icon URL (image shown at the bottom of the embed).
   * @returns {Embed} Returns the instance for method chaining.
   * @throws {Error} Throws an error if the footer text or icon URL is invalid.
   */
  setFooter({ footerText, footerIconUrl }) {
    if (!this.footer) this.footer = {};
    if (footerText !== undefined && footerText !== null) {
      if (typeof footerText !== "string") throw new Error("Footer text must be a string.");
      this.footer.text = footerText;
    }
    if (footerIconUrl !== undefined && footerIconUrl !== null) {
      if (typeof footerIconUrl !== "string") throw new Error("Footer icon URL must be a string.");
      this.footer.icon_url = footerIconUrl;
    }
    return this;
  }

  /**
   * Sets the author of the embed.
   * @param {Object} options - Author options.
   * @param {string} options.authorName - The name of the author.
   * @param {string} options.authorUrl - The URL of the author.
   * @param {string} options.authorIconUrl - The icon URL of the author.
   * @returns {Embed} Returns the instance for method chaining.
   * @throws {Error} Throws an error if any of the author options are invalid.
   */
  setAuthor({ authorName, authorUrl, authorIconUrl }) {
    if (!this.author) this.author = {};
    if (authorName !== undefined && authorName !== null) {
      if (typeof authorName !== "string") throw new Error("Author name must be a string.");
      this.author.name = authorName;
    }
    if (authorIconUrl !== undefined && authorIconUrl !== null) {
      if (typeof authorIconUrl !== "string") throw new Error("Author icon URL must be a string.");
      this.author.icon_url = authorIconUrl;
    }
    if (authorUrl !== undefined && authorUrl !== null) {
      if (typeof authorUrl !== "string") throw new Error("Author URL must be a string.");
      this.author.url = authorUrl;
    }
    return this;
  }

  /**
   * Sets the timestamp of the embed to the current date and time in ISO format.
   * @returns {Embed} Returns the instance for method chaining.
   */
  setTimestamp() {
    this.timestamp = new Date().toISOString();
    return this;
  }

  /**
   * Sets the image of the embed.
   * @param {string} imageUrl - The URL of the image.
   * @returns {Embed} Returns the instance for method chaining.
   * @throws {Error} Throws an error if the image URL is not a string.
   */
  setImage(imageUrl) {
    if (typeof imageUrl !== "string") throw new Error("Image URL must be a string.");
    this.image = { url: imageUrl };
    return this;
  }
}

/**
 * Represents a field in a Discord Embed.
 * @class
 */
class Field {
  /**
   * Creates an instance of Field.
   * @param {string} title - The title of the field.
   * @param {string} value - The value of the field.
   * @param {boolean} [inline=true] - Whether the field should be displayed inline.
   * @throws {Error} Throws an error if the title or value is not a string.
   */
  constructor(title, value, inline = true) {
    if (typeof title !== "string" || typeof value !== "string") throw new Error("Field title and value must be strings.");
    this.name = title;
    this.value = value;
    this.inline = inline;
  }
}

/**
 * Represents a Discord Webhook for sending messages.
 * @class
 */
class Webhook {
  /**
   * Creates an instance of Webhook.
   * @param {string} webhookUrl - The URL of the Discord webhook.
   * @param {string=} [username="Webhook"] - The Username for the Discord webhook.
   * @throws {Error} Throws an error if no webhook URL is provided.
   */
  constructor(webhookUrl, username = "Webhook") {
    if (webhookUrl === undefined || webhookUrl === null) throw new Error("No Webhook URL Provided");

    this.webhookUrl = webhookUrl;
    this.username = username;

    this.content = null;
    this.avatarUrl = null;
    this.embeds = null;
    this.lastPayload = null;
  }

  /**
   * Sets the username for the webhook message.
   * @param {string} username - The username to display for the webhook message.
   * @returns {Webhook} Returns the instance for method chaining.
   * @throws {Error} Throws an error if the username is not a string.
   */
  setUsername(username) {
    if (typeof username !== "string") throw new Error("Username must be a string.");
    this.username = username;
    return this;
  }

  /**
   * Sets the avatar URL for the webhook message.
   * @param {string} imageUrl - The URL of the avatar image.
   * @returns {Webhook} Returns the instance for method chaining.
   * @throws {Error} Throws an error if the image URL is not a string.
   */
  setAvatar(imageUrl) {
    if (typeof imageUrl !== "string") throw new Error("Avatar URL must be a string.");
    this.avatarUrl = imageUrl;
    return this;
  }

  /**
   * Sets the content of the webhook message.
   * @param {string} content - The text content of the message.
   * @returns {Webhook} Returns the instance for method chaining.
   * @throws {Error} Throws an error if the content is not a string.
   */
  setContent(content) {
    if (typeof content !== "string") throw new Error("Content must be a string.");
    this.content = content;
    return this;
  }

  /**
   * Adds an embed/s to the webhook payload.
   * @param {Embed|Embed[]} embeds - An array of embed objects to send.
   * @returns {Webhook} The Webhook instance to chain methods.
   * @throws {Error} Throws an error if the embeds are not valid Embed objects.
   */
  addEmbeds(embeds) {
    if (!Array.isArray(embeds)) embeds = [embeds];
    embeds.forEach(embed => {
      if (!(embed instanceof Embed)) throw new Error("All embeds must be instances of Embed.");
    });
    this.embeds = this.embeds ? this.embeds.concat(embeds) : embeds;
    return this;
  }

  /**
   * Gets the last payload sent on the webhook. (Dev Use)
   * @returns {string} The JSON Stringified Payload.
   */
  getLastPayload() {
    return this.lastPayload;
  }

  /**
   * Sends the message to the webhook.
   * A Discord message may only hold 5 embeds.
   * A message containing more than 5 embeds will be split into separate messages.
   * If text content is present, it will send only on the first embed.
   * @returns {UrlFetchApp.HTTPResponse[]} The responses from the webhook.
   * @throws {Error} Throws an error if the webhook URL is invalid or the request fails.
   */
  send() {
    const responses = [];

    const payload = {
      username: this.username,
    };
    if (this.avatarUrl) payload.avatar_url = this.avatarUrl;

    while (this.embeds && this.embeds.length > 0 || this.content) {
      if (this.content) payload.content = this.content;
      if (this.embeds && this.embeds.length > 0) payload.embeds = this.embeds.splice(0, 5);

      const params = {
        method: "POST",
        contentType: "application/json",
        muteHttpExceptions: true,
        payload: JSON.stringify(payload),
      };

      try {
        const response = UrlFetchApp.fetch(this.webhookUrl, params);
        this.lastPayload = payload;
        this.content = null;
        payload.content = null;
        responses.push(response);
      } catch (error) {
        throw new Error(`Failed to send webhook: ${error.message}`);
      }
    }

    return responses;
  }
}
