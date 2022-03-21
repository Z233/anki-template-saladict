import { isDev } from './helper'

export interface Card {
  Date: string
  Text: string
  Translation: string
  Context: string
  ContextCloze: string
  Note: string
  Title: string
  Url: string
  Favicon: string
  Audio: string
}

const dummyCard: Card = {
  Date: `1646793945653`,
  Text: `interference-driven`,
  Translation: `<div class="trans"><span class="trans_title">google</span><div class="trans_content">她走在美丽的地方，就像夜晚</div><span class="trans_title">youdaotrans</span><div class="trans_content">她走在美丽的夜色中</div><span class="trans_title">caiyun</span><div class="trans_content">她举步娉婷，就像夜晚</div></div>`,
  Context: `To avoid interference-driven churn and recurring annoyance in your review sessions, you should strive to write prompts which you can almost always answer correctly.`,
  ContextCloze: `To avoid {{c1::interference-driven}} churn and recurring annoyance in your review sessions, you should strive to write prompts which you can almost always answer correctly.`,
  Note: ``,
  Title: 'HedgeDoc - Collaborative markdown notes',
  Url: 'https://md.yuuza.net/FCMkmLrYT6ivmMBjffKg7Q?view',
  Favicon: 'https://md.yuuza.net/icons/favicon.ico',
  // Anki Desktop
  //   Audio: `<a class="replay-button soundLink" href=# onclick="pycmd('play:q:0'); return false;">
  //     <svg class="playImage" viewBox="0 0 64 64" version="1.1">
  //         <circle cx="32" cy="32" r="29" />
  //         <path d="M56.502,32.301l-37.502,20.101l0.329,-40.804l37.173,20.703Z" />
  //     </svg>
  // </a>`,
  // AnkiDroid
  // Audio: `<a class='replaybutton' href="playsound:file:///storage/emulated/0/ankidroid/collection.media/youdao-fd7ea1ed-66d8e31d-ac038b88-65939f1b-42a4e7f4.mp3"><span><svg viewbox="0 0 32 32"><polygon points="11,25 25,16 11,7"/>replay</svg></span></a>`,
  Audio: `<a onclick="console.log('sound played')" />`,
}

export const getCard = () => (isDev ? dummyCard : window.card)
