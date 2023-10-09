let fetch = require('node-fetch')
let uploadImage = require('../lib/uploadImage.js')

let handler = async (m, { conn, usedPrefix, command, text, args }) => {
let response = args.join(' ').split('|')
   if (!args[0]) throw `*Example:* .${command} How are you?|Rimuru`
	conn.sendMessage(m.chat, {
		react: {
			text: '🕒',
			key: m.key,
		}
	})
  let hasil = await fetch(`https://api.yanzbotz.my.id/api/ai/characterai?text=${response[0]}&name=${response[1]}`)
  try {
  let res = await hasil.json()
  let kiku = `❏ *Pertanyaan:*
${response[0]}

❏ *Character:*
${response[1]}

❏ *Jawaban:*
${res.result}`
  conn.reply(m.chat, kiku, m, {
      contextInfo: {
        externalAdReply: {
          title: "Character.AI",
          thumbnailUrl: 'https://telegra.ph/file/c3fed80d772fb94c50050.jpg',
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    });
    } catch (e) {
    console.log(e);
    m.reply(`Gagal Meminta Apa Yang Kamu Mau:(`);
  }
}
handler.command = /^characterai|cai$/i
handler.help = ['cai <text>']
handler.tags = ['tools']
handler.register = true
handler.limit = true

module.exports = handler