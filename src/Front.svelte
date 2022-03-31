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
  import Keyboard from './views/Keyboard.svelte'
  import { slide } from 'svelte/transition'
  import { expoOut } from 'svelte/easing'

  import { loadPersistence } from './utils/persistence'
  import { getCard } from './utils/card'
  import { emitter } from './utils/emitter'
  import IconHint from './components/IconHint.svelte'
  import IconCheck from './components/IconCheck.svelte'

  const {
    ContextCloze,
    Audio: AudioHTML,
    TextAudio: TextAudioHTML,
    Title,
    Translation: TransitionHTML,
    Note: NoteHTML,
    Url,
    Symbol,
  } = getCard()

  loadPersistence()

  // easy: 4, good: 3, hard: 2, bad: 1
  let state: 1 | 2 | 3 | 4 = 3

  let isReset = false
  let isFocus = true
  let isCorrect = false
  let isShowHint = false
  let isShowAnswer = false
  let dotsVisible = false

  let cloze: Cloze | null = null
  let audio: Audio | null = null
  let textAudio: Audio | null = null

  function showAnswer() {
    isShowAnswer = true
    audio.play()
  }

  function handleChecked(isAllCorrect: boolean) {
    isCorrect = isAllCorrect
    showAnswer()
  }

  function handleShowAnswer() {
    isCorrect = cloze.showAnswer()
    state = isReset ? state : isCorrect ? (isShowHint ? 2 : 3) : 1
    showAnswer()
    textAudio && textAudio.play()
  }

  function handleNextCard() {
    console.log('state', state)
    dotsVisible = true
    setTimeout(() => {
      window.Persistence.setItem(`signal:answer_ease${state}`)
      window.location.href = 'signal:show_answer'
    }, 300)
  }

  function handleKeyDown(e: CustomEvent) {
    emitter.emit('keydown', e)
  }

  function handleHint() {
    isShowHint = true
    textAudio.play()
  }

  function handleResetInput() {
    isReset = true
    isShowAnswer = false
    isCorrect = false
    dotsVisible = false
    cloze.reset()
  }
</script>

<div class="h-full w-full flex flex-col bg-white dark:bg-gray-900">
  {#if !!AudioHTML.trim()}
    <Audio bind:this={audio} html={AudioHTML} />
  {/if}
  {#if !!TextAudioHTML.trim()}
    <Audio bind:this={textAudio} html={TextAudioHTML} />
  {/if}
  <Count />
  <Timer />
  <div class="grow pt-6 pb-4 flex flex-col">
    <div class="grow pb-2 flex flex-col px-4">
      <Cloze
        bind:this={cloze}
        on:focus={() => (isFocus = true)}
        on:blur={() => (isFocus = false)}
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
          {#if !isCorrect}
            <BaseButton
              type="secondly"
              on:click={handleResetInput}
              className="w-full">再试一次</BaseButton
            >
          {/if}
          <BaseButton on:click={handleNextCard} className="w-full"
            >下一个</BaseButton
          >
        {/if}
      </div>
    </div>
    {#if isFocus}
      <div
        class="px-1"
        transition:slide={{ delay: 200, easing: expoOut }}
      >
        <div
          class="flex justify-around items-center border-t 
        border-gray-200 px-24 py-2 text-xl text-gray-600"
        >
          <IconHint
            hintContent={Symbol}
            onHint={handleHint}
            className="h-6"
          />
          <IconCheck onCheck={handleShowAnswer} className="h-6" />
        </div>
        <Keyboard
          on:keydown={handleKeyDown}
          --height="3rem"
          --margin="0.25rem 0.125rem"
        />
      </div>
    {/if}
  </div>
</div>
