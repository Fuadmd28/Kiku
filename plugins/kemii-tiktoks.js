let fetch = require('node-fetch')

let handler = async (m, { conn, text, command }) => {
  if (!text) throw `*Example*: .${command} jedag jedug`
  conn.sendMessage(m.chat, { react: { text: '🤹🏻‍♀️', key: m.key }})
  let kemii = await fetch(`https://xzn.wtf/api/ttsearch?search=${text}&apikey=${global.xzn}`)
  try {
  let res = await kemii.json()
  let te = `*〤  TIKTOK SEARCH*

❏ *Author:* @${res.author.unique_id}
❏ *Caption:* ${res.title}`;
  conn.sendFile(m.chat, res.play, 'tiktoks.mp4', te, m)
   } catch (e) {
    console.log(e);
    m.reply(`Failed :(`);
  }
}
handler.help = ['tiktoksearch'].map(v => v + ' <text>')
handler.tags = ['downloader']

handler.command = /^tiktoks|tiktoksearch|ttsearch$/i
handler.premium = false

module.exports = handler