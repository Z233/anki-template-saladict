export declare global {
  interface Window {
    AnkiDroidJS: {
      init(jsonData?: string): string
      ankiGetNewCardCount(): string | undefined
      ankiGetLrnCardCount(): string | undefined
      ankiGetRevCardCount(): string | undefined
      ankiGetETA(): number
      ankiGetCardMark(): boolean
      ankiGetCardFlag(): number
      ankiGetNextTime1(): string
      ankiGetNextTime2(): string
      ankiGetNextTime3(): string
      ankiGetNextTime4(): string
      ankiGetCardReps(): number
      ankiGetCardnumbererval(): number
      /** Returns the ease as an int (percentage * 10). Default: 2500 (250%). Minimum: 1300 (130%)  */
      ankiGetCardFactor(): number
      /** Returns the last modified time as a Unix timestamp in seconds. Example: 1477384099  */
      ankiGetCardMod(): number
      /** Returns the ID of the card. Example: 1477380543053  */
      ankiGetCardId(): number
      /** Returns the ID of the note which generated the card. Example: 1590418157630  */
      ankiGetCardNid(): number
      ankiGetCardType(): number
      /** Returns the ID of the deck which contains the card. Example: 1595967594978  */
      ankiGetCardDid(): number
      ankiGetCardLeft(): number
      /** Returns the ID of the home deck for the card if it is filtered, or 0 if not filtered. Example: 1595967594978  */
      ankiGetCardODid(): number
      ankiGetCardODue(): number
      ankiGetCardQueue(): number
      ankiGetCardLapses(): number
      ankiGetCardDue(): number
      ankiIsInFullscreen(): boolean
      ankiIsTopbarShown(): boolean
      ankiIsInNightMode(): boolean
      ankiIsDisplayingAnswer(): boolean
      ankiGetDeckName(): string
      ankiBuryCard(): boolean
      ankiBuryNote(): boolean
      ankiSuspendCard(): boolean
      ankiSuspendNote(): boolean
      ankiAddTagToCard()
      ankiSearchCard(query: ?string)
      ankiIsActiveNetworkMetered(): boolean
      ankiTtsFieldModifierIsAvailable(): boolean
      ankiTtsSpeak(text: ?string, queueMode: number): Int
      ankiTtsSpeak(text: ?string): number
      ankiTtsSetLanguage(loc: ?string): number
      ankiTtsSetPitch(pitch: number): Int
      ankiTtsSetPitch(pitch: number): Int
      ankiTtsSetSpeechRate(speechRate: number): Int
      ankiTtsSetSpeechRate(speechRate: number): Int
      ankiTtsIsSpeaking(): boolean
      ankiTtsStop(): number
      ankiEnableHorizontalScrollbar(scroll: boolean)
      ankiEnableVerticalScrollbar(scroll: boolean)
      ankiSearchCardWithCallback(query: string)
    }
  }
}
