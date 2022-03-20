<script lang="ts">
  import BaseButton from './components/BaseButton.svelte'
  import Count from './components/Count.svelte'
  import Tag from './components/Tag.svelte'
  import Timer from './components/Timer.svelte'
  import ClozeInput from './components/ClozeInput.svelte'
  import { tick } from 'svelte'

  let clozeInputCount = 0

  // const ContextCloze =
  //   'To avoid {{c1::interference-driven}} {{c1::churn}} and recurring annoyance in your review sessions, you should strive to write prompts which you can almost always answer correctly.'

  const ContextCloze = `She walks in {{c1::beauty}}, like the night`

  $: ContextClozeHTML = ContextCloze.replace(
    /{{c\d::(.*?)}}/gs,
    (_, word) => {
      clozeInputCount++
      return `<span id="${word}" class="inline-flex flex-col">${
        (async (clozeInputCount) => {
          await tick()
          new ClozeInput({
            target: document.getElementById(word),
            props: {
              word: word,
              autofocus: clozeInputCount === 1
            },
          })
        })(clozeInputCount) && ''
      }</span>`
    }
  )

  const translations = [
    {
      text: '她走在美丽的地方，就像夜晚',
      source: 'google',
    },
    {
      text: '她走在美丽的夜色中',
      source: 'youdaotrans',
    },
    {
      text: '她举步娉婷，就像夜晚',
      source: 'caiyun',
    },
  ]
</script>

<div class="h-full w-full flex flex-col bg-white dark:bg-gray-900">
  <Count />
  <Timer />
  <div class="grow p-8 flex flex-col">
    <p lang="en" class=" leading-7">
      {@html `${ContextClozeHTML}`}
    </p>
    <div class="mt-6 grow">
      <Tag>翻译</Tag>
      <div class="mt-3 space-y-2">
        {#each translations as item}
          <div>
            <p>{item.text}</p>
            <p class="text-gray-300 text-xs">
              {item.source.toUpperCase()}
            </p>
          </div>
        {/each}
      </div>
      <div class="mt-3">
        <Tag>笔记</Tag>
      </div>
    </div>
    <BaseButton className="w-full items-end">下一个</BaseButton>
  </div>
</div>
