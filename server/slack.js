var SlackBot = require('slackbots')
var axios = require('axios')
var config = require('../config.js')

// create a bot
const bot = new SlackBot({
  token: config.rend, //rend
  // token: config.fmbm, //fmbm
  name: 'Ragnaros, the Firelord',
})

const botParams = {
  slackbot: true,
}

bot.on('start', () => {
  // more information about additional params https://api.slack.com/methods/chat.postMessage

  // define channel, where bot exist. You can adjust it there https://my.slack.com/services
  bot.postMessageToChannel('general', 'I live, insects!', botParams)

  // define existing username instead of 'user_name'
  bot.postMessageToUser('user_name', 'meow!', botParams)

  // If you add a 'slackbot' property,
  // you will post to another user's slackbot channel instead of a direct message
  bot.postMessageToUser('user_name', 'meow!', botParams)

  // define private group instead of 'private_group', where bot exist
  bot.postMessageToGroup('private_group', 'meow!', botParams)
})

bot.on('error', error => {
  console.log('error => ', error)
})

bot.on('message', data => {
  if (data.type !== 'message' || data.username === bot.name) {
    return
  }

  console.log('message => ', data)
  handleMessage(data.text, data.channel)
})

const handleMessage = (message, channel) => {
  console.log(message, channel)
  if (message.includes(' chucknorris') || message.includes(' Chuck Norris')) {
    makeChuckNorrisJoke('general')
  } else if (message.includes(' yomomma') || message.includes(' Yo Momma')) {
    makeYoMommaJoke('general')
  } else if (message.includes(' random')) {
    makeRandomJoke('general')
  } else if (message.includes(' bye')) {
    sayGoodbye('general')
  }
}

const makeChuckNorrisJoke = channel => {
  axios('http://api.icndb.com/jokes/random').then(result => {
    const joke = result.data.value.joke
    bot.postMessageToChannel(channel, joke, botParams)
  })
}

const makeYoMommaJoke = channel => {
  axios('http://api.yomomma.info').then(result => {
    const joke = result.data.joke
    bot.postMessageToChannel(channel, joke, botParams)
  })
}

const makeRandomJoke = channel => {
  const rand = Math.round(Math.random())
  if (rand === 0) {
    makeChuckNorrisJoke('general')
  } else {
    makeYoMommaJoke('general')
  }
}

const sayGoodbye = channel => {
  bot.postMessageToChannel(channel, '... Too sooon`', botParams)
}

module.exports = bot
