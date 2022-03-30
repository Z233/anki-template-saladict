<button
  on:mousedown
  on:touchstart
  class="relative before:top-1/2 before:left-1/2 before:w-9 before:h-9
  before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full
  before:absolute  rounded-full active:before:bg-[rgba(0,0,0,.06)]"
>
  <slot />
</button>
