<script lang="ts">
  import { onMount } from 'svelte'

  export let word = ''
  export let autofocus = false

  let isSpellChecking = false

  let input = ''
  let inputWidth = 0
  let inputOriginWidth = 0

  $: toComputeText = isSpellChecking
    ? input
    : word.length > input.length
    ? word
    : input

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      isSpellChecking = true
    }
  }

  onMount(() => {
    inputOriginWidth = inputWidth
  })
</script>

<span
  on:keydown={handleKeyDown}
  class="inline-block relative text-primary"
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
    ">{toComputeText}</span
  >
</span>

{#if isSpellChecking}
  <span class="px-1">{word}</span>
{/if}

<style>
  span::after {
    content: '';
    @apply w-full h-[1px] inline-block bg-current absolute 
    bottom-0 left-0;
  }
</style>
