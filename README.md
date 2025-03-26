# GAS-Discord-Helpers
Discord Embed, Field And Webhook Classes For Use In Google Apps Script To Interact With Discord.

# Example Usage
```js
function exampleUsage(){
  // First we instantiate the Embed class. 
  // We may pass in a 'title' if we so choose
  // Below are all the methods in use. you may use as many or as few of these to build your embed.
  const embed = new Embed("Some title for the embed")
    .setAuthor({
      authorName : "BillyBourbon",
      authorUrl : "https://github.com/BillyBourbon/GAS-Discord-Helpers/tree/main",
      authorIconUrl : "https://ih1.redbubble.net/image.446555700.9148/flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
    })
    .setColor(15548997) // Red hexadecimal
    .setDescription("Your embeds description goes in here") 
    .setFooter({
      footerText : "An example embed",
      footerIconUrl : "https://ih1.redbubble.net/image.446555700.9148/flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
    })
    .setTimestamp()
    .setImage("https://ih1.redbubble.net/image.446555700.9148/flat,750x,075,f-pad,750x1000,f8f8f8.jpg")
    .setUrl("https://github.com/BillyBourbon/GAS-Discord-Helpers/tree/main")
  
  // To add a field to the embed 
  embed.addField("Field Title", "Field Content")

  const field = new Field("Field Title", "Field Contents")

  const field2 = new Field("Field Title Two", "Field Contents Two", true)


  embed.addField(field)
  
  const arrayOfFields = [ field2, field2 ]

  embed.addFields(arrayOfFields)

  console.log(embed)
  
  const webhookUrl = "YOUR_WEBHOOK_URL_HERE"
  const webhook = new Webhook(webhookUrl)

  webhook.setUsername("Test Webhook")
  webhook.setAvatar("https://ih1.redbubble.net/image.446555700.9148/flat,750x,075,f-pad,750x1000,f8f8f8.jpg")

  webhook.addEmbeds(embed)
  
  webhook.setContent("HELLO WORLD")

  const webhookResponses = webhook.send()

  webhookResponses.forEach((res, i)=>{
    console.log(`Response: ${i+1}`)
    console.log(res.getResponseCode())
    console.log(res.getContentText())
  })
}
```
![image](https://github.com/user-attachments/assets/816f2479-c968-49eb-9b10-9e9f11574f3e)
