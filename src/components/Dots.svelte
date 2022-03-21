<script lang="ts">
  export let state: 1 | 2 | 3 | 4 = 3
  export let className = ''

  const dotsState = {
    4: 'bg-green-500 dark:bg-green-700',
    3: 'bg-primary dark:bg-primary-dark',
    2: 'bg-secondly dark:bg-secondly-dark',
    1: 'bg-red-500 dark:bg-red-700',
  }

  const DOT_NUM = 3
</script>

<div class="space-x-1 flex justify-center">
  {#each Array(DOT_NUM) as _}
    <span
      class={`${dotsState[state]} ${className} inline-block 
      w-1.5 h-1.5 rounded-full`}
    />
  {/each}
</div>
