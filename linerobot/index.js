// 引用 dotenv 讀取.env 檔的設定
import 'dotenv/config'
// 引用 linebot
import linebot from 'linebot'
import fetchCafe from './commands/fetchCafe.js'
// import temp from './temp/cafe.js'

// console.log(process.env)
// 設定 linebot 用linebot套件建立一個機器人
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', event => {
  // console.log(event)
  if (event.message.type !== 'text') return
  // if (event.message.text === '忠孝新生') {
  fetchCafe(event)
  // }
})

// linebot 偵測指定 port 的指定路徑請求
// 雲端機器人會自動偵測 port 所以不寫死
bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
