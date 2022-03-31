<script lang="ts" context="module">
  export type ClozeContext = {
    setWord: (word: string, arg1: WordStatus) => void
    setIsAnyFocus: (state: boolean) => void
  }
  export type WordStatus = {
    isFocus?: boolean
    isInput?: boolean
    isChecked?: boolean
    isCorrect?: boolean
    checkAnswer?: () => void
  }
</script>

<script lang="ts">
  import ClozeInput from './ClozeInput.svelte'
  import { tick, createEventDispatcher } from 'svelte'

  export let contextCloze = ''

  const dispatch = createEventDispatcher()

  const clozeContext = new Map<'cloze', ClozeContext>()
  const wordsMap = new Map<string, WordStatus>()
  clozeContext.set('cloze', {
    setWord: (word: string, status: WordStatus) => {
      if (!wordsMap.has(word)) wordsMap.set(word, status)
      else wordsMap.set(word, { ...wordsMap.get(word), ...status })
    },
    setIsAnyFocus(state: boolean) {
      if (state) {
        dispatch('focus')
      } else {
        dispatch('blur')
      }
    },
  })

  let clozeInputCount = 0
  let clozeInputs: ClozeInput[] = []

  $: contextClozeHTML = contextCloze.replace(
    /{+c\d::(.*?)}+/gs,
    (_, word) => {
      clozeInputCount++
      const uniqueId = clozeInputCount
      return `<span id="${uniqueId}" class="inline-flex flex-col">${
        (async (clozeInputCount, uniqueId) => {
          await tick()
          const clozeInput = new ClozeInput({
            target: document.querySelector(`[id='${uniqueId}']`),
            props: {
              word: word,
              autofocus: clozeInputCount === 1,
              key: clozeInputCount,
            },
            context: clozeContext,
          })
          clozeInputs.push(clozeInput)
        })(clozeInputCount, uniqueId) && ''
      }</span>`
    }
  )

  export const reset = () => {
    clozeInputs.forEach((x) => x.$destroy())
    clozeInputs = []
    clozeInputCount = 0
    wordsMap.clear()
  }

  export const showAnswer = () => {
    Array.from(wordsMap.values()).forEach((x) => x.checkAnswer())
    return isAllCorrect()
  }

  const isAllInput = () =>
    Array.from(wordsMap.values()).every(({ isInput }) => isInput)

  const isAllCorrect = () =>
    Array.from(wordsMap.values()).every(({ isCorrect }) => isCorrect)

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (!isAllInput()) return
      for (let [word, { checkAnswer }] of wordsMap) {
        checkAnswer()
      }
      dispatch('checked', isAllCorrect())
    }
  }
</script>

<p on:keydown={handleKeyDown} lang="en" class=" leading-7">
  {@html contextClozeHTML}
</p>
