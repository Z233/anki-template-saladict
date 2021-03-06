<script>
// @ts-nocheck

  import { createEventDispatcher } from 'svelte'

  import standard from 'svelte-keyboard/layouts/standard'
  import crossword from 'svelte-keyboard/layouts/crossword'
  import wordle from 'svelte-keyboard/layouts/wordle'
  import backspaceSVG from 'svelte-keyboard/svg/backspace'
  import enterSVG from 'svelte-keyboard/svg/enter'

  // exposed props
  export let custom = false
  export let layout = 'standard'
  export let noSwap = []
  export let keyClass = {}

  // vars
  let page = 0
  let shifted = false
  let active = undefined

  const layouts = { standard, crossword, wordle }
  const dispatch = createEventDispatcher()
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'
  const swaps = {
    Page0: 'abc',
    Page1: '?123',
    Space: ' ',
    Shift: 'abc',
    Enter: enterSVG,
    Backspace: backspaceSVG,
  }

  // functions
  const unique = (arr) => [...new Set(arr)]

  function handleKeyDown(e) {
    e.cancelable && e.preventDefault()
    const target = e.path.find(
      (el) => el.tagName === 'BUTTON' && el.classList.contains('key')
    )
    if (!target.dataset.key) return
    const value = target.dataset.key
    active = value
    if (value.includes('Page')) {
      page = +value.substr(-1)
    } else if (value === 'Shift') {
      shifted = !shifted
    } else {
      let output = value
      if (shifted && alphabet.includes(value))
        output = value.toUpperCase()
      dispatch('keydown', output)
    }
    e.cancelable && e.stopPropagation()
    return false
  }

  function handleKeyUp(e) {
    const value = e.target.dataset.key
    setTimeout(() => {
      if (value === active) active = undefined
    }, 0)
  }

  // reactive vars
  $: rawData = custom || layouts[layout] || standard
  $: data = rawData.map((d) => {
    let display = d.display
    const s = swaps[d.value]
    const shouldSwap = s && !noSwap.includes(d.value) && !d.noSwap
    if (shouldSwap) display = s
    if (!display) display = shifted ? d.value.toUpperCase() : d.value
    if (d.value === 'Shift') display = shifted ? s : s.toUpperCase()
    return {
      ...d,
      display,
    }
  })

  $: page0 = data.filter((d) => !d.page)
  $: page1 = data.filter((d) => d.page)

  $: rows0 = unique(page0.map((d) => d.row))
  $: rows0, rows0.sort((a, b) => a - b)

  $: rows1 = unique(page1.map((d) => d.row))
  $: rows1, rows1.sort((a, b) => a - b)

  $: rowData0 = rows0.map((r) => page0.filter((k) => k.row === r))
  $: rowData1 = rows0.map((r) => page1.filter((k) => k.row === r))
  $: rowData = [rowData0, rowData1]
</script>

<div class="svelte-keyboard">
  {#each rowData as row, i}
    <div
      on:mousedown={(e) => handleKeyDown(e)}
      on:mouseup={(e) => handleKeyUp(e)}
      on:touchstart={(e) => handleKeyDown(e)}
      on:touchend={(e) => handleKeyUp(e)}
      class="page"
      class:visible={i === page}
    >
      {#each row as keys}
        <div class="row row--{i}">
          {#each keys as { value, display }}
            <button
              data-key={value}
              class="key key--{value} {keyClass[value] || ''}"
              class:single={value.length === 1}
              class:active={value === active}
            >
              {#if display.includes('<svg')}
                {@html display}
              {:else}{display}{/if}
            </button>
          {/each}
        </div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .row {
    display: flex;
    justify-content: center;
    touch-action: manipulation;
  }

  button {
    appearance: none;
    display: inline-block;
    text-align: center;
    vertical-align: baseline;
    cursor: pointer;
    line-height: 1;
    transform-origin: 50% 50%;
    user-select: none;
    background: var(--button-background, #eee);
    color: var(--color, #111);
    border: var(--border, none);
    border-radius: var(--border-radius, 2px);
    box-shadow: 0 0 0 0.125rem var(--background, white);
    flex: var(--flex, 1);
    font-family: var(--font-family, sans-serif);
    font-size: var(--font-size, 20px);
    font-weight: var(--font-weight, normal);
    height: var(--height, 3.5rem);
    margin: var(--margin, 0.125rem);
    opacity: var(--opacity, 1);
    text-transform: var(--text-transform, none);
    -webkit-tap-highlight-color: transparent;
  }

  button.single {
    min-width: var(--min-width, 2rem);
  }

  button.active,
  button:active {
    background: var(--active-background, #ccc);
    border: var(--active-border, none);
    box-shadow: var(--active-box-shadow, none);
    color: var(--active-color, #111);
    opacity: var(--active-opacity, 1);
    transform: var(--active-transform, none);
  }

  button.key--Space {
    width: var(--space-width, 20%);
    flex: var(--space-flex, 3);
  }

  button.key--Page0,
  button.key--Page1,
  button.key--Shift,
  button.key--Backspace,
  button.key--Enter {
    flex: var(--special-flex, 1.5);
  }

  .page {
    display: none;
    background: var(--background, none);
  }

  .page.visible {
    display: block;
  }

  :global(.svelte-keyboard svg) {
    stroke-width: var(--stroke-width, 3px);
  }
</style>
