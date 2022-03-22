import { isDev } from './helper'

const AnkiDroidJS = isDev
  ? ({
      ankiGetNewCardCount: () => '20',
      ankiGetLrnCardCount: () => '20',
      ankiGetRevCardCount: () => '20',
      ankiGetETA: () => 60,
    } as Window['AnkiDroidJS'])
  : window.AnkiDroidJS

export default AnkiDroidJS
