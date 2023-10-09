const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

let handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text) throw `Masukkan Email!\n\nContoh: ${usedPrefix + command} abcd@gmail.com`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'shelltherv3@gmail.com',
        pass: 'thgahcnlyawhqsbn'
      }
    });

    // Generate random verification code
    const verificationCode = uuidv4();

    const mailOptions = {
      from: 'shelltherv3@gmail.com',
      to: text,
      subject: 'ShellTher : 3 - Verification',
      text: `Your verification code is: ${verificationCode}`
    };

    await transporter.sendMail(mailOptions);
    conn.reply(m.chat, 'Kode berhasil dikirim, silahkan cek email anda!', m);
  } catch (error) {
    console.log(error);
    m.reply('Terjadi kesalahan dalam mengirim email!');
  }
};

handler.command = handler.help = ['testing'];
handler.tags = ['tools'];

module.exports = handler;