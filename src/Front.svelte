<script lang="ts">
  import BaseButton from './components/BaseButton.svelte'
  import Count from './components/Count.svelte'
  import Tag from './components/Tag.svelte'
  import Timer from './components/Timer.svelte'
  import Cloze from './components/Cloze.svelte'

  import { loadPersistence } from './utils/persistence'

  loadPersistence()

  // easy: 4, good: 3, hard: 2, bad: 1
  let state = 3

  let isCorrect = false
  let isShowHint = false
  let isShowAnswer = false
  let cloze: Cloze | null = null

  const ContextCloze =
    'To avoid {{c1::churn}} {{c1::churn}} and recurring annoyance in your review sessions, you should strive to write prompts which you can almost always answer correctly.'

  // const ContextCloze = `She walks in {{c1::beauty}}, {{c1::like}} the night`

  function handleChecked(isAllCorrect: boolean) {
    isCorrect = isAllCorrect
    showAnswer()
  }

  function handleShowAnswer() {
    isCorrect = cloze.showAnswer()
    state = isCorrect ? (isShowHint ? 2 : 3) : 1
    showAnswer()
  }

  function handleShowHint() {
    isShowHint = true
  }

  function handleNextCard() {
    window.Persistence.setItem(state)
  }

  function showAnswer() {
    isShowAnswer = true
    console.log({ isCorrect })
  }

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
  <div class="grow px-8 pb-8 pt-6 flex flex-col">
    <Cloze
      bind:this={cloze}
      on:checked={(e) => handleChecked(e.detail)}
      contextCloze={ContextCloze}
    />
    <a href="about:blank" class="text-sm mt-1 text-gray-300"
      >—— HedgeDoc - Collaborative markdown notes</a
    >
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
    <div class="items-end space-y-3">
      {#if isShowAnswer}
        <BaseButton on:click={handleNextCard} className="w-full"
          >下一个</BaseButton
        >
      {:else}
        <BaseButton on:click={handleShowAnswer} className="w-full"
          >显示答案</BaseButton
        >
        {#if !isShowHint}
          <BaseButton
            on:click={handleShowHint}
            type="secondly"
            className="w-full">提示一下</BaseButton
          >
        {/if}
      {/if}
    </div>
  </div>
</div>
