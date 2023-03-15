/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
const screenController = () => {
  const greeting = document.querySelector('.greeting')
  const optionsSection = document.querySelector('.options')
  const playGround = document.querySelector('.playground')
  const result = document.querySelector('.result')

  const playBtn = document.querySelector('.greeting__play')
  const playAgainBtn = document.querySelector('.result__reset')
  const exitBtn = document.querySelector('.result__exit')
  const restartBtn = playGround.querySelector('.playground__button')

  const options = document.querySelector('.options')
  const optionBtns = options.querySelectorAll('.option')

  const gridCells = [...document.querySelectorAll('.playground__grid-cell')]

  const resultText = document.querySelector('.result__text')

  let choices = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  let userIcon
  let computerIcon

  const reloadPage = () => {
    document.location.reload()
  }

  const returnPlayground = (e) => {
    if (e.target.classList.contains('result__reset')) {
      result.classList.add('hidden')
      playGround.classList.remove('hidden')
    }
    restartBtn.setAttribute('disabled', true)
    choices = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    gridCells.forEach((cell) => {
      cell.addEventListener('click', changeCellState, { once: true })
      cell.classList.remove('no-hover')
      cell.id = undefined
    })
  }

  const showNextSection = (section) => {
    section.nextElementSibling.classList.remove('hidden')
  }

  const hideCurrentSection = (section) => {
    section.classList.add('hidden')
    showNextSection(section)
  }

  const setPlayerIcon = (e) => {
    userIcon = e.currentTarget.id
    computerIcon = (userIcon === 'cross' ? 'zero' : 'cross')
    hideCurrentSection(optionsSection)
  }

  const checkForWin = () => {
    resultText.className = 'result__text'
    if (choices[0] === choices[1] && choices[1] === choices[2]) {
      if (choices[0] === userIcon) {
        resultText.textContent = 'you win!'
        resultText.classList.add('victory')
      } else {
        resultText.textContent = 'you lose...'
        resultText.classList.add('loss')
      }
      setTimeout(() => hideCurrentSection(playGround), 500)
    } else if (choices[3] === choices[4] && choices[4] === choices[5]) {
      if (choices[3] === userIcon) {
        resultText.textContent = 'you win!'
        resultText.classList.add('victory')
      } else {
        resultText.textContent = 'you lose...'
        resultText.classList.add('loss')
      }
      setTimeout(() => hideCurrentSection(playGround), 500)
    } else if (choices[6] === choices[7] && choices[7] === choices[8]) {
      if (choices[6] === userIcon) {
        resultText.textContent = 'you win!'
        resultText.classList.add('victory')
      } else {
        resultText.textContent = 'you lose...'
        resultText.classList.add('loss')
      }
      setTimeout(() => hideCurrentSection(playGround), 500)
    } else if (choices[0] === choices[3] && choices[3] === choices[6]) {
      if (choices[0] === userIcon) {
        resultText.textContent = 'you win!'
        resultText.classList.add('victory')
      } else {
        resultText.textContent = 'you lose...'
        resultText.classList.add('loss')
      }
      setTimeout(() => hideCurrentSection(playGround), 500)
    } else if (choices[1] === choices[4] && choices[4] === choices[7]) {
      if (choices[1] === userIcon) {
        resultText.textContent = 'you win!'
        resultText.classList.add('victory')
      } else {
        resultText.textContent = 'you lose...'
        resultText.classList.add('loss')
      }
      setTimeout(() => hideCurrentSection(playGround), 500)
    } else if (choices[2] === choices[5] && choices[5] === choices[8]) {
      if (choices[2] === userIcon) {
        resultText.textContent = 'you win!'
        resultText.classList.add('victory')
      } else {
        resultText.textContent = 'you lose...'
        resultText.classList.add('loss')
      }
      setTimeout(() => hideCurrentSection(playGround), 500)
    } else if (choices[0] === choices[4] && choices[4] === choices[8]) {
      if (choices[0] === userIcon) {
        resultText.textContent = 'you win!'
        resultText.classList.add('victory')
      } else {
        resultText.textContent = 'you lose...'
        resultText.classList.add('loss')
      }
      setTimeout(() => hideCurrentSection(playGround), 500)
    } else if (choices[2] === choices[4] && choices[4] === choices[6]) {
      if (choices[2] === userIcon) {
        resultText.textContent = 'you win!'
        resultText.classList.add('victory')
      } else {
        resultText.textContent = 'you lose...'
        resultText.classList.add('loss')
      }
      setTimeout(() => hideCurrentSection(playGround), 500)
    }
  }

  const computersMove = () => {
    const emptyIndexes = []
    for (let i = 0; i < 9; i += 1) {
      if (choices[i] !== 'zero' && choices[i] !== 'cross') emptyIndexes.push(i)
    }
    const randomCellIndex = emptyIndexes[parseInt(Math.random() * emptyIndexes.length, 10)]
    const randomCell = gridCells[randomCellIndex]
    randomCell.id = computerIcon
    choices[randomCellIndex] = computerIcon
    randomCell.classList.add('no-hover')
    gridCells.forEach((cell, i) => {
      if (choices[i] !== 'zero' && choices[i] !== 'cross') {
        cell.addEventListener('click', changeCellState, { once: true })
        cell.classList.remove('no-hover')
      }
    })
    randomCell.removeEventListener('click', changeCellState)
    checkForWin()
  }

  const changeCellState = (e) => {
    const cell = e.target
    const index = gridCells.indexOf(cell)
    cell.id = userIcon
    cell.classList.add('no-hover')
    choices[index] = userIcon
    if (restartBtn.hasAttribute('disabled')) restartBtn.removeAttribute('disabled')
    checkForWin()
    gridCells.forEach((again) => {
      again.removeEventListener('click', changeCellState)
      again.classList.add('no-hover')
    })
    setTimeout(computersMove, 1000)
  }

  playBtn.addEventListener('click', () => hideCurrentSection(greeting))
  optionBtns.forEach((option) => option.addEventListener('click', setPlayerIcon))
  gridCells.forEach((cell) => cell.addEventListener('click', changeCellState, { once: true }))
  exitBtn.addEventListener('click', reloadPage)
  playAgainBtn.addEventListener('click', returnPlayground)
  restartBtn.addEventListener('click', returnPlayground)
}

screenController()
