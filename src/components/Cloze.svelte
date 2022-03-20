<script lang="ts" context="module">
  export type ClozeContext = {
    setWord: (word: string, arg1: WordStatus) => void
  }
  export type WordStatus = {
    isChecked: boolean
    isCorrect: boolean
  }
</script>

<script lang="ts">
  import ClozeInput from './ClozeInput.svelte'
  import { tick } from 'svelte'

  export let contextCloze = ''

  const clozeContext = new Map<'cloze', ClozeContext>()
  const wordsStatus = new Map<string, WordStatus>()
  clozeContext.set('cloze', {
    setWord: (
      word: string,
      { isChecked = false, isCorrect = false }
    ) => {
      wordsStatus.set(word, { isChecked, isCorrect })
    },
  })

  $: {
    console.log(wordsStatus)
  }

  let clozeInputCount = 0

  $: contextClozeHTML = contextCloze.replace(
    /{{c\d::(.*?)}}/gs,
    (_, word) => {
      clozeInputCount++
      return `<span class="${word} inline-flex flex-col">${
        (async (clozeInputCount) => {
          await tick()
          new ClozeInput({
            target: document.querySelectorAll(`.${word}`)[
              clozeInputCount - 1
            ],
            props: {
              word: word,
              autofocus: clozeInputCount === 1,
            },
            context: clozeContext,
          })
        })(clozeInputCount) && ''
      }</span>`
    }
  )
</script>

<p lang="en" class=" leading-7">
  {@html contextClozeHTML}
</p>
