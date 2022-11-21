// 引用 dotenv 讀取.env 檔的設定
import 'dotenv/config'
// 引用 linebot
import linebot from 'linebot'
import fetchCafe from './commands/fetchCafe.js'
// import test2 from './test/test2.js'

// 查店名----------------------------
import fetchCafeName from './commands/fetchCafeName.js'
// 查店名----------------------------

// 查location-----------------------
import fetchDist from './commands/fetchDist.js'
// 查location-----------------------

// console.log(process.env)
// 設定 linebot 用linebot套件建立一個機器人
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
})

bot.on('message', event => {
  console.log(event.message)
  if (event.message.type === 'location') {
    fetchDist(event)
  } else if (event.message.type === 'text') {
    // 查店名----------------------------
    if (event.message.text.startsWith('查店名 ')) {
      fetchCafeName(event)
      // 查店名----------------------------
      // 查location-----------------------
      // } else if (event.message.type === 'location') {
      // 查location-----------------------
      // 查捷運-----------------------------
    } else if (event.message.text.startsWith('查捷運 ')) {
      // 測試
      fetchCafe(event)
      // 原檔
      // 查捷運-----------------------------
      // } else {
      //   fetchCafe(event)
      // 查捷運-----------------------------
    } else {
      event.reply('請輸入正確的查詢規則，謝謝')
    }
  }
})

// linebot 偵測指定 port 的指定路徑請求
// 雲端機器人會自動偵測 port 所以不寫死
bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
