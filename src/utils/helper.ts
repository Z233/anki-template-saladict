export const isDev = process.env.NODE_ENV === 'development'

export function spellCheck(input: string, word: string) {
  const length = Math.max(word.length, input.length)
  let inputHTML = '',
    wordHTML = '',
    isCorrect = true

  for (let i = 0, j = 0; i < length && j < length; ) {
    while (word[j] && input[j] && word[j] !== input[j]) {
      j++
      isCorrect = false
    }
    if (!word[j] || !input[j]) {
      inputHTML += `<span class="wrong">${input.substring(
        i,
        length
      )}</span>`

      wordHTML += `<span class="correct">${word.substring(
        i,
        length
      )}</span>`
      break
    }
    if (i !== j) {
      inputHTML += `<span class="wrong">${input.substring(
        i,
        j
      )}</span>`
      wordHTML += `<span class="correct">${word.substring(
        i,
        j
      )}</span>`
      i = j
    } else {
      inputHTML += input[i]
      wordHTML += word[i]
      i++, j++
    }
  }

  return {
    inputHTML,
    wordHTML,
    isCorrect,
  }
}