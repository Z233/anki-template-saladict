<script lang="ts">
  import { onMount } from 'svelte'

  let timer: HTMLElement | null = null
  let start: number | null = null
  const DURATION = 10000

  function step(timestamp: number) {
    if (start === undefined) start = timestamp
    const elapsed = timestamp - start
    timer.style.width =
      Math.min((100 / DURATION) * elapsed, 100) + '%'
    if (elapsed < DURATION) window.requestAnimationFrame(step)
  }

  onMount(() => {
    window.requestAnimationFrame(step)
  })
</script>

<div
  class="w-full h-1 bg-gray-200 dark:bg-gray-700 z-10 absolute top-0 left-0 
  "
>
  <div
    bind:this={timer}
    class="bg-primary dark:bg-primary-dark h-full w-0"
  />
</div>
