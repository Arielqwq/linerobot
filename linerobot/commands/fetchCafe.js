import axios from 'axios'
import temp from '../temp/cafe.js'
import writejson from '../utils/writejson.js'

export default async (event) => {
  // if (event.message.type === 'text') {
  try {
    const { data } = await axios.get('https://cafenomad.tw/api/v1.2/cafes')
    const cafes = data.filter(cafe => cafe.mrt === event.message.text)
    const bubbles = []
    for (const cafe of cafes) {
      console.log(cafe)
      const bubble = JSON.parse(JSON.stringify(temp))
      bubble.body.contents[0].text = cafe.name || '-'
      bubble.body.contents[1].contents[0].contents[1].text = cafe.address || '-'
      bubble.body.contents[1].contents[1].contents[1].text = cafe.open_time || '-'
      bubble.footer.contents[0].action.uri = cafe.url || '-'

      // bubble.body.contents[1].contents[0].contents[0].text = cafe.find('address').text().trim()
      bubbles.push(bubble)
    }
    // console.log(bubbles)
    const reply = {
      type: 'flex',
      altText: '咖啡店查詢結果',
      contents: {
        type: 'carousel',
        contents: bubbles
      }
    }
    event.reply(reply)
    writejson(reply, 'cafes')
  } catch (error) {
    console.log(error)
    event.reply('目前未找到資料，請稍候再試')
  }
  // }
}
