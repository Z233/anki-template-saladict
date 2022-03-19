const AnkiDroidJS = window.AnkiDroidJS || {
  ankiGetNewCardCount: () => '20',
  ankiGetLrnCardCount: () => '20',
  ankiGetRevCardCount: () => '20',
  ankiGetETA: () => 60,
} as Window['AnkiDroidJS']

export default AnkiDroidJS