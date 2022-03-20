<script lang="ts">
  import {
    onMount,
    getContext,
  } from 'svelte'
  import { slide } from 'svelte/transition'
  import type { ClozeContext } from './Cloze.svelte'

  type DiffRanges = [number, number][]

  export let word = ''
  export let autofocus = false

  const clozeContext: ClozeContext = getContext('cloze')
  const { setWord } = clozeContext

  setWord(word, { isChecked: false, isCorrect: false })

  let isSpellChecking = false
  let diffRanges: DiffRanges = []
  $: isCorrect = !!input && diffRanges.length === 0
  $: setWord(word, { isChecked: isSpellChecking, isCorrect: isCorrect })

  let input = ''
  let inputWidth = 0
  let inputOriginWidth = 0
  $: toComputeText = word.length > input.length ? word : input

  function spellCheck(input: string, word: string): DiffRanges {
    const diffRanges: DiffRanges = []
    const length = Math.max(word.length, input.length)

    for (let i = 0, j = 0; i < length && j < length; i++, j++) {
      while (word[j] && input[j] && word[j] !== input[j]) j++
      if (!word[j] || !input[j]) {
        diffRanges.push([i, length])
        break
      }
      if (i !== j) diffRanges.push([i, j])
      i = j
    }

    return diffRanges
  }

  function renderDiffRanges(
    text: string,
    type: 'wrong' | 'correct',
    ranges: DiffRanges
  ) {
    const result = []
    let lastIndex = 0

    for (const [start, end] of ranges) {
      if (start > lastIndex) {
        result.push(text.slice(lastIndex, start))
      }
      result.push(
        `<span class="${type}">${text.slice(start, end)}</span>`
      )
      lastIndex = end
    }

    if (lastIndex < text.length) {
      result.push(text.slice(lastIndex))
    }

    return result.join('')
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      diffRanges = spellCheck(input, word)
      isSpellChecking = true
    }
  }

  onMount(() => {
    inputOriginWidth = inputWidth
  })
</script>

<span
  on:keydown={handleKeyDown}
  class={`inline-block relative text-gray-900 ${
    isSpellChecking && isCorrect ? 'text-success' : ''
  }`}
>
  <!-- svelte-ignore a11y-autofocus -->
  <input
    on:keydown
    bind:value={input}
    {autofocus}
    type="text"
    spellcheck="false"
    class=" outline-none px-1"
    style={`
      width: ${Math.max(inputWidth, inputOriginWidth)}px;
      visibility: ${isSpellChecking ? 'hidden' : 'visible'};
    `}
  />
  <span
    bind:clientWidth={inputWidth}
    style={`visibility: ${isSpellChecking ? 'visible' : 'hidden'}`}
    class=" whitespace-pre absolute left-0 px-1
    "
  >
    {#if isSpellChecking}
      {@html renderDiffRanges(input, 'wrong', diffRanges)}
    {:else}
      {toComputeText}
    {/if}
  </span>
</span>

{#if isSpellChecking && !isCorrect}
  <span transition:slide class="mt-0.5 px-1"
    >{@html renderDiffRanges(word, 'correct', diffRanges)}</span
  >
{/if}

<style>
  span::after {
    content: '';
    @apply w-full h-[1px] inline-block bg-current absolute 
    bottom-0 left-0;
  }
</style>
