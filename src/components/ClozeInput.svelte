<script lang="ts">
  import { onMount, getContext } from 'svelte'
  import { slide } from 'svelte/transition'
  import type { ClozeContext, WordStatus } from './Cloze.svelte'
  import { spellCheck } from '../utils/helper'
  import { emitter } from '../utils/emitter'

  export let key = 0
  export let word = ''
  export let autofocus = false

  const clozeContext: ClozeContext = getContext('cloze')
  const { setWord, setIsAnyFocus } = clozeContext
  const setThisWord = (status: WordStatus) =>
    setWord(word + key, status)

  let isSpellChecking = false
  let isShowAnswer = false
  let isCorrect = false
  let isFocus = false

  let input = ''
  let inputWidth = 0
  let inputOriginWidth = 0
  $: toComputeText = word.length > input.length ? word : input

  $: setThisWord({
    isInput: !!input,
    isFocus,
  })

  const checkRet = {
    inputHTML: '',
    wordHTML: '',
  }

  function checkAnswer() {
    if (!!input.trim()) {
      const ret = spellCheck(input, word)
      checkRet.inputHTML = ret.inputHTML
      checkRet.wordHTML = ret.wordHTML
      isCorrect = ret.isCorrect
      isSpellChecking = true
    } else {
      isShowAnswer = true
      isCorrect = false
    }
    setThisWord({
      isChecked: true,
      isCorrect,
    })
  }

  emitter.on('keydown', (e: CustomEvent) => {
    if (!isFocus) return
    if (e.detail === 'Backspace') {
      input = input.slice(0, -1)
    } else if (e.detail === 'Enter') {
    } else {
      input += e.detail
    }
  })

  onMount(() => {
    if (autofocus) {
      isFocus = true
      setIsAnyFocus(true)
    }
    inputOriginWidth = inputWidth
    setThisWord({
      checkAnswer,
    })
  })
</script>

<span
  on:keydown
  class={`inline-block relative text-gray-900 ${
    isSpellChecking && isCorrect ? 'text-success' : ''
  }`}
>
  <!-- svelte-ignore a11y-autofocus -->
  <input
    bind:value={input}
    on:keydown
    on:focus={() => ((isFocus = true), setIsAnyFocus(true))}
    on:blur={() => ((isFocus = false), setIsAnyFocus(false))}
    tabindex={key}
    {autofocus}
    type="text"
    spellcheck="false"
    class=" outline-none px-1"
    style={`
      width: ${Math.max(inputWidth, inputOriginWidth)}px;
      visibility: ${
        isSpellChecking || isShowAnswer ? 'hidden' : 'visible'
      };
    `}
  />
  <span
    bind:clientWidth={inputWidth}
    style={`visibility: ${
      isSpellChecking || isShowAnswer ? 'visible' : 'hidden'
    }`}
    class=" whitespace-pre absolute left-0 px-1
    "
  >
    {#if isSpellChecking}
      {@html checkRet.inputHTML}
    {:else if isShowAnswer}
      {word}
    {:else}
      {toComputeText}
    {/if}
  </span>
</span>

{#if isSpellChecking && !isCorrect}
  <span transition:slide class="mt-0.5 px-1"
    >{@html checkRet.wordHTML}</span
  >
{/if}

<style>
  span::after {
    content: '';
    @apply w-full h-[1px] inline-block bg-current absolute 
    bottom-0 left-0;
  }
</style>
