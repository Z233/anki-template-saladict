<script lang="ts">
  export let html = ''

  let element: HTMLElement | null = null

  export function play() {
    const clickEvent = new Event('click')
    element.firstChild.dispatchEvent(clickEvent)
  }
</script>

<div bind:this={element} class=" fixed invisible -top-full">
  {@html html}
</div>
