var tools = require("./components/CovidAPI.js");


const keepAlive = require("./server")

const Discord = require("discord.js")
const fetch = require("node-fetch")
const client = new Discord.Client()
//Instance of clinet is our connection to discord
const { MessageEmbed } = require('discord.js');

//https://discordjs.guide/popular-topics/embeds.html
function getEmbedForCovidCase(venue,address,suburb,date,time,alertmsg){     
  const exampleEmbed = new MessageEmbed()
	  .setColor('#FF0000')
	  .setTitle(venue)
	  .addFields(
      { name: 'Address', value: address },
      { name: 'Suburb', value: suburb },
      { name: 'Date', value: date },
      { name: 'Time', value: time },
      { name: 'Alert', value: alertmsg },
	  )
      
  return exampleEmbed;
}

//client.on() checks for events
//ready event is called when event takes place
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

//when discord server has new message, message event called
client.on("message", async msg => {
  if (msg.author.bot) return

  
  if (msg.content.startsWith('?')){

    location = msg.content.substring(1).trim()
    const cases = await tools.getUsefulInfo(location)
    
    if (cases.length !== 0){
      msg.channel.send("**CASES OF CONCERN NEAR " + location +":**\n")
      for (let i = 0 ;i < cases.length;i++){

        currentcase = cases[i]
        const caseEmbed = getEmbedForCovidCase(
                            currentcase["Venue"],
                            currentcase["Address"],
                            currentcase["Suburb"],
                            currentcase["Date"],
                            currentcase["Time"],
                            currentcase["Alert"]
                            );
        msg.channel.send(caseEmbed);
      }

    }
    else{
      msg.channel.send("**There are no cases of concern near " + location +"**")
    } 

  }
})


keepAlive()
client.login(process.env['TOKEN'])





