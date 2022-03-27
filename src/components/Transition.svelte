<script lang="ts">
  export let html = ''

  const titleRe = /(?<=trans_title"\>).*?(?=<\/span>)/gs
  const contentRe = /(?<=trans_content"\>).*?(?=<\/div>)/gs

  const transitions: {
    title: string
    content: string
  }[] = []

  let title = null,
    content = null

  while (
    (title = titleRe.exec(html)) !== null &&
    (content = contentRe.exec(html)) !== null
  ) {
    if (
      title.index === titleRe.lastIndex &&
      content.index === contentRe.lastIndex
    ) {
      titleRe.lastIndex++
      contentRe.lastIndex++
    }

    transitions.push({
      title: title[0],
      content: content[0],
    })
  }
</script>

{#each transitions as item}
  <div class="leading-6">
    <p>{item.content}</p>
    <p class="text-gray-400 text-sm mt-1">
      {item.title.toUpperCase()}
    </p>
  </div>
{/each}
