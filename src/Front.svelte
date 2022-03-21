<script lang="ts">
  import BaseButton from './components/BaseButton.svelte'
  import Count from './components/Count.svelte'
  import Tag from './components/Tag.svelte'
  import Timer from './components/Timer.svelte'
  import Cloze from './components/Cloze.svelte'
  import Audio from './components/Audio.svelte'
  import Transition from './components/Transition.svelte'
  import Dots from './components/Dots.svelte'

  // @ts-ignore
  import Keyboard from 'svelte-keyboard'

  import { loadPersistence } from './utils/persistence'
  import { getCard } from './utils/card'

  const {
    ContextCloze,
    Audio: AudioHTML,
    Title,
    Translation: TransitionHTML,
    Note: NoteHTML,
    Url,
  } = getCard()

  loadPersistence()

  // easy: 4, good: 3, hard: 2, bad: 1
  let state: 1 | 2 | 3 | 4 = 3

  let isCorrect = false
  let isShowHint = false
  let isShowAnswer = false
  let dotsVisible = false

  let cloze: Cloze | null = null
  let audio: Audio | null = null

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
    audio.play()
    isShowHint = true
  }

  function handleNextCard() {
    dotsVisible = true
    setTimeout(() => {
      window.Persistence.setItem(`signal:answer_ease${state}`)
      window.location.href = 'signal:show_answer'
    }, 300)
  }

  function handleKeyDown(e) {
    console.log(e)

  }

  function showAnswer() {
    isShowAnswer = true
  }
</script>

<div class="h-full w-full flex flex-col bg-white dark:bg-gray-900">
  <Audio bind:this={audio} html={AudioHTML} />
  <Count />
  <Timer />
  <div class="grow px-4 pb-8 pt-6 flex flex-col">
    <Cloze
      bind:this={cloze}
      on:checked={(e) => handleChecked(e.detail)}
      contextCloze={ContextCloze}
    />
    <a href={Url} class="text-sm mt-1 text-gray-400">—— {Title}</a>
    <div class="mt-6 grow">
      <Tag>翻译</Tag>
      <div class="mt-3 space-y-2">
        <Transition html={TransitionHTML} />
      </div>
      {#if isShowAnswer && !!NoteHTML.trim()}
        <div class="mt-3">
          <Tag>笔记</Tag>
          <div class="mt-3">
            {@html NoteHTML}
          </div>
        </div>
      {/if}
    </div>
    <div class="items-end space-y-3 px-8">
      {#if isShowAnswer}
        {#if dotsVisible}
          <Dots {state} />
        {/if}
        <BaseButton on:click={handleNextCard} className="w-full"
          >下一个</BaseButton
        >
      {:else}
        <BaseButton on:click={handleShowAnswer} className="w-full"
          >显示答案</BaseButton
        >
        {#if !!AudioHTML.trim() && !isShowHint}
          <BaseButton
            on:click={handleShowHint}
            type="secondly"
            className="w-full">提示一下</BaseButton
          >
        {/if}
      {/if}
    </div>
  </div>

  <Keyboard on:keydown={handleKeyDown} />
</div>
