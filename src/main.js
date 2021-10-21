require('dotenv/config')

const { BOT_TOKEN, PORT = 8000, HOST = 'http://localhost:8000' } = process.env
const request = require('request')
const { Telegraf } = require('telegraf')
const express = require('express')

const bot = new Telegraf(BOT_TOKEN)
const server = express()

server.get('/file/:id', async (req, res) => {
  const file = await bot.telegram.getFileLink(req.params.id)
  request.get(file.href).pipe(res)
})

bot.on('document', (ctx) => {
  ctx.reply(`${HOST}/file/${ctx.message.document.file_id}`)
})

bot.launch().then(() => {
  console.log('Bot is running')
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
