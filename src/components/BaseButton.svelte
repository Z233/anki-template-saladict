<script lang="ts">
  type ButtonType = 'primary' | 'secondly' | 'error'

  export let className = ''
  export let type: ButtonType = 'primary'

  const buttonTypes = {
    primary: 'bg-primary dark:bg-primary-dark',
    secondly: 'bg-secondly dark:bg-secondly-dark',
    error: 'bg-red-600 dark:bg-red-800',
  }
</script>

<button
  on:click
  class={`${className} ${buttonTypes[type]} 
  dark:text-gray-100 text-white p-3 rounded-full 
  focus:outline-none select-none focus:ring-2`}
>
  <slot />
</button>
