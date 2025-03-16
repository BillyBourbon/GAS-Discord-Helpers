/**
 * Represents a Discord Embed object.
 * @class
 */
class Embed {
  /**
   * Creates an instance of Embed.
   * @param {string} title - The title of the embed.
   * @throws {Error} Throws an error if no title is provided.
   */
  constructor(title) {
    if (title === undefined || title === null) throw new Error("No Title For Embed");

    this.title = title;
    this.color = 663399; // Default color
    this.fields = [];
  }

  /**
   * Sets the title of the embed.
   * @param {string} title - The title of the embed.
   * @returns {Embed} Returns the instance for method chaining.
   */
  setTitle(title) {
    this.title = title;
    return this;
  }

  /**
   * Sets the color of the embed.
   * @param {string|number} color - The color of the embed (hexadecimal or decimal).
   * @returns {Embed} Returns the instance for method chaining.
   */
  setColor(color) {
    this.color = color;
    return this;
  }

  /**
   * Sets the description of the embed.
   * @param {string} description - The description text shown above the fields.
   * @returns {Embed} Returns the instance for method chaining.
   */
  setDescription(description) {
    this.description = description;
    return this;
  }

  /**
   * Sets the URL of the embed.
   * @param {string} url - The URL of the embed.
   * @returns {Embed} Returns the instance for method chaining.
   */
  setUrl(url) {
    this.url = url;
    return this;
  }

  /**
   * Adds a single field to the embed.
   * @param {Field} field - The field to add to the embed.
   * @returns {Embed} Returns the instance for method chaining.
   */
  addField(field) {
    this.fields.push(field);
    return this;
  }

  /**
   * Adds a single field to the embed.
   * @param {string} fieldTitle - The title of the field.
   * @param {string} fieldValue - The value of the field.
   * @param {boolean} [fieldInline=true] - Whether the field should be displayed inline.
   * @returns {Embed} Returns the instance for method chaining.
   */
  addField(fieldTitle, fieldValue, fieldInline){
    this.addField(new Field(fieldTitle,fieldValue, fieldInline))
    return this
  }

  /**
   * Adds multiple fields to the embed.
   * @param {Field[]} fields - An array of fields to add to the embed.
   * @returns {Embed} Returns the instance for method chaining.
   */
  addFields(fields) {
    this.fields = this.fields.concat(fields);
    return this;
  }

  /**
   * Sets the footer of the embed.
   * @param {Object} options - Footer options.
   * @param {string} options.footerText - Footer text shown at the bottom of the embed.
   * @param {string} options.footerIconUrl - Footer icon URL (image shown at the bottom of the embed).
   * @returns {Embed} Returns the instance for method chaining.
   */
  setFooter({ footerText, footerIconUrl }) {
    if (!this.footer) this.footer = {};
    if (footerText !== undefined && footerText !== null) this.footer.text = footerText;
    if (footerIconUrl !== undefined && footerIconUrl !== null) this.footer.icon_url = footerIconUrl;
    return this;
  }

  /**
   * Sets the author of the embed.
   * @param {Object} options - Author options.
   * @param {string} options.authorName - The name of the author.
   * @param {string} options.authorUrl - The URL of the author.
   * @param {string} options.authorIconUrl - The icon URL of the author.
   * @returns {Embed} Returns the instance for method chaining.
   */
  setAuthor({ authorName, authorUrl, authorIconUrl }) {
    if (!this.author) this.author = {};
    if (authorName !== undefined && authorName !== null) this.author.name = authorName;
    if (authorIconUrl !== undefined && authorIconUrl !== null) this.author.icon_url = authorIconUrl;
    if (authorUrl !== undefined && authorUrl !== null) this.author.url = authorUrl;
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
   */
  setImage(imageUrl) {
    this.image = { url : imageUrl };
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
   */
  constructor(title, value, inline = true) {
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
   * @throws {Error} Throws an error if no webhook URL is provided.
   */
  constructor(webhookUrl) {
    if (webhookUrl === undefined || webhookUrl === null) throw new Error("No Webhook URL Provided");

    this.webhookUrl = webhookUrl;
  }

  /**
   * Sends a payload to the webhook. Not intended for use
   * @param {string} payload - The JSON stringified payload to send.
   * @returns {UrlFetchApp.HTTPResponse} The response from the webhook.
   */
  sendPayload(payload) {
    const params = {
      method : "POST",
      contentType : "application/json",
      muteHttpExceptions : true,
      payload : payload,
    };

    const response = UrlFetchApp.fetch(this.webhookUrl, params);

    return response;
  }

  /**
   * Sends a single embed to the webhook.
   * @param {Embed} embed - The embed object to send.
   * @returns {UrlFetchApp.HTTPResponse} The response from the webhook.
   */
  sendEmbed(embed) {
    const payload = JSON.stringify({ embeds : [embed] });

    return this.sendPayload(payload);
  }

  /**
   * Sends multiple embeds to the webhook.
   * @param {Embed[]} embeds - An array of embed objects to send.
   * @returns {UrlFetchApp.HTTPResponse} The response from the webhook.
   */
  sendEmbeds(embeds) {
    const payload = JSON.stringify({ embeds : embeds });

    return this.sendPayload(payload);
  }
}
