<script lang="ts">
  import { fade } from 'svelte/transition'
  import IconButton from './IconButton.svelte'

  export let className = ''
  export let hintContent = ''
  export let onHint = Function.prototype

  let hintVisible = false

  function showHint(e: MouseEvent | TouchEvent) {
    e.preventDefault()
    onHint()
    if (!hintContent.trim().length) return
    hintVisible = true
    setTimeout(() => {
      hintVisible = false
    }, 3000)
    e.stopPropagation()
    return false
  }
</script>

<IconButton on:click={showHint}>
  <svg
    class={`icon fill-current ${className} bg-transparent`}
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      transform={hintVisible
        ? ''
        : `translate(-70, -160)
           scale(1.1)`}
    >
      <path
        d="M510.251681 216.20311c-140.642181 0-254.656911 114.013707-254.656911 254.654864 0 88.484264 45.137013 166.417217 113.63406 212.05872l0 172.743296 283.856953 0 0-173.951821c67.479881-45.803185 111.818715-123.144668 111.818715-210.849172C764.904499 330.216817 650.891815 216.20311 510.251681 216.20311zM644.995525 608.138594c-15.053857 14.779611-32.537044 27.085892-51.801806 36.264948l0 142.501528L429.118849 786.90507 429.118849 644.505873c-19.352767-9.188266-36.912701-21.531386-52.024887-36.367279-35.354206-34.70236-57.292867-83.023902-57.292867-136.477324 0-105.620549 85.6231-191.243649 191.245695-191.243649 105.619526 0 191.241602 85.622076 191.241602 191.243649C702.288392 525.115716 680.348708 573.436234 644.995525 608.138594z"
      />
      <path
        d="M383.660518 895.14426l256.082376 0 0 64.310701-256.082376 0 0-64.310701Z"
      />
    </g>
    {#if hintVisible}<g>
        <path
          d="M159.527083 690.817466l70.845699-70.845699 45.473373 45.473373-70.845699 70.845699-45.473373-45.473373Z"
        /><path
          d="M127.675356 384.027373l100.19191 0 0 64.310701-100.19191 0 0-64.310701Z"
        /><path
          d="M237.572121 128.297685l70.845699 70.845699-45.474097 45.474097-70.845699-70.845699 45.474097-45.474097Z"
        /><path
          d="M480.059032 63.715137l64.310701 0 0 100.19191-64.310701 0 0-100.19191Z"
        /><path
          d="M833.361813 172.754197l-70.845699 70.845699-45.474821-45.474821 70.845699-70.845699 45.474821 45.474821Z"
        /><path
          d="M795.189246 383.51879l100.192933 0 0 64.311725-100.192933 0 0-64.311725Z"
        /><path
          d="M818.908129 735.802474l-70.846423-70.846423 45.474097-45.474097 70.846423 70.846423-45.474097 45.474097Z"
        />
      </g>
    {/if}
  </svg>
  {#if hintVisible}
    <span
      transition:fade={{ duration: 100 }}
      class="absolute z-20 -top-[calc(100%+1rem)] text-sm
    text-white px-2 py-1 left-1/2 -translate-x-1/2"
    >
      <div
        class="absolute inset-0 bg-black -z-10 rounded after:absolute 
        after:block after:w-0 after:h-0 after:-translate-x-1/2 after:-bottom-1.5 
        after:left-1/2 after:border-l-[.5rem] after:border-l-transparent 
        after:border-r-[.5rem] after:border-r-transparent after:border-t-[.5rem] 
        after:border-t-black"
      />
      {hintContent}</span
    >
  {/if}
</IconButton>
