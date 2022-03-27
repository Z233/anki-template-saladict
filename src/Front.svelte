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

  const {
    ContextCloze,
    Audio: AudioHTML,
    TextAudio: TextAudioHTML,
    Title,
    Translation: TransitionHTML,
    Note: NoteHTML,
    Url,
  } = getCard()

  loadPersistence()

  // easy: 4, good: 3, hard: 2, bad: 1
  let state: 1 | 2 | 3 | 4 = 3

  let isFocus = true
  let isCorrect = false
  let isShowHint = false
  let isShowAnswer = false
  let dotsVisible = false

  let cloze: Cloze | null = null
  let audio: Audio | null = null
  let textAudio: Audio | null = null

  function handleChecked(isAllCorrect: boolean) {
    isCorrect = isAllCorrect
    showAnswer()
  }

  function handleShowAnswer() {
    isCorrect = cloze.showAnswer()
    state = isCorrect ? (isShowHint ? 2 : 3) : 1
    showAnswer()
    textAudio && textAudio.play()
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

  function handleKeyDown(e: CustomEvent) {
    emitter.emit('keydown', e)
  }

  function showAnswer() {
    isShowAnswer = true
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
  <div class="grow px-4 pb-8 pt-6 flex flex-col">
    <Cloze
      bind:this={cloze}
      on:focus={() => (isFocus = true)}
      on:blur={() => (isFocus = true)}
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
    <!-- <div class="items-end space-y-3 px-8">
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
        {#if audio && !isShowHint}
          <BaseButton
            on:click={handleShowHint}
            type="secondly"
            className="w-full">提示一下</BaseButton
          >
        {/if}
      {/if}
    </div> -->
  </div>

  {#if isFocus}
    <div transition:slide={{ delay: 200, easing: expoOut }}>
      <div class=" border-t border-gray-200 px-4 pt-2 pb-3 text-xl text-gray-600">
        <svg class="icon h-6 fill-current" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1234"><path d="M510.251681 216.20311c-140.642181 0-254.656911 114.013707-254.656911 254.654864 0 88.484264 45.137013 166.417217 113.63406 212.05872l0 172.743296 283.856953 0 0-173.951821c67.479881-45.803185 111.818715-123.144668 111.818715-210.849172C764.904499 330.216817 650.891815 216.20311 510.251681 216.20311zM644.995525 608.138594c-15.053857 14.779611-32.537044 27.085892-51.801806 36.264948l0 142.501528L429.118849 786.90507 429.118849 644.505873c-19.352767-9.188266-36.912701-21.531386-52.024887-36.367279-35.354206-34.70236-57.292867-83.023902-57.292867-136.477324 0-105.620549 85.6231-191.243649 191.245695-191.243649 105.619526 0 191.241602 85.622076 191.241602 191.243649C702.288392 525.115716 680.348708 573.436234 644.995525 608.138594z" p-id="1235"></path><path d="M383.660518 895.14426l256.082376 0 0 64.310701-256.082376 0 0-64.310701Z" p-id="1236"></path><path d="M159.527083 690.817466l70.845699-70.845699 45.473373 45.473373-70.845699 70.845699-45.473373-45.473373Z" p-id="1237"></path><path d="M127.675356 384.027373l100.19191 0 0 64.310701-100.19191 0 0-64.310701Z" p-id="1238"></path><path d="M237.572121 128.297685l70.845699 70.845699-45.474097 45.474097-70.845699-70.845699 45.474097-45.474097Z" p-id="1239"></path><path d="M480.059032 63.715137l64.310701 0 0 100.19191-64.310701 0 0-100.19191Z" p-id="1240"></path><path d="M833.361813 172.754197l-70.845699 70.845699-45.474821-45.474821 70.845699-70.845699 45.474821 45.474821Z" p-id="1241"></path><path d="M795.189246 383.51879l100.192933 0 0 64.311725-100.192933 0 0-64.311725Z" p-id="1242"></path><path d="M818.908129 735.802474l-70.846423-70.846423 45.474097-45.474097 70.846423 70.846423-45.474097 45.474097Z" p-id="1243"></path></svg>
      </div>
      <Keyboard on:keydown={handleKeyDown} />
    </div>
  {/if}
</div>
