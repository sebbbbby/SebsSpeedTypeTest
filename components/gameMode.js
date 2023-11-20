import { UserInputHandler } from './userInput.js'
import { determineWPM } from './score.js'
export class Game {
    constructor() {
        this.start = false
        this.score = 0
        this.userInputs = []
        this.currentWordIndex = 0
        this.currentLetterIndex = 0
        this.typingTestElement = document.querySelector('.typingTest')
        this.userInputHandler = new UserInputHandler(this)
        this.timerElement = document.getElementById('timer')
        this.timer = null
        this.timeLimit = 30
    }
    restartGame() {
        this.start = false
        this.score = 0
        this.userInputs = []
        this.currentWordIndex = 0
        this.currentLetterIndex = 0
        this.timeLimit = 30
        this.updateTimer()

        const allWordDivs = document.querySelectorAll('.word')
        allWordDivs.forEach((wordDiv) => {
            wordDiv.classList.remove('correctWord', 'incorrectWord')
            const letterSpans = wordDiv.querySelectorAll('.letter')
            letterSpans.forEach((letterSpan) => {
                letterSpan.classList.remove('correct', 'incorrect')
            })
        })

        clearInterval(this.timer)

        console.log('Game restarted!')
    }

    startGame() {
        if (!this.start) {
            this.start = true
            this.timer = setInterval(() => {
                this.timeLimit--
                this.updateTimer()
                if (this.timeLimit <= 0) {
                    this.endGame()
                }
            }, 1000)
        }
    }

    updateTimer() {
        this.timerElement.textContent = `Time: ${this.timeLimit}s`
    }

    endGame() {
        if (this.timer) {
            clearInterval(this.timer)
            this.timer = null
        }

        const wordsCorrect = document.querySelectorAll('.correctWord').length
        const wordsTotal = document.querySelectorAll('.word').length
        const wordsIncorrect =
            document.querySelectorAll('.incorrectWord').length

        determineWPM(wordsCorrect, wordsIncorrect, wordsTotal)
    }

    trackUserInputs(param) {
        this.userInputHandler.trackUserInputs(param)
    }

    playCurrentLetter(param) {
        this.userInputHandler.playCurrentLetter(param)
    }

    correctInput(letterTag) {
        if (letterTag.classList.contains('incorrect')) {
            letterTag.classList.remove('incorrect')
        }
        letterTag.classList.add('correct')
    }

    wrongInput(letterTag) {
        if (letterTag.classList.contains('correct')) {
            letterTag.classList.remove('correct')
        }
        letterTag.classList.add('incorrect')
        this.updateWordClass(letterTag.closest('.word'))
    }

    updateWordClass(wordDiv) {
        const letterTags = wordDiv.querySelectorAll('.letter')
        let allCorrect = true

        for (const letterTag of letterTags) {
            if (!letterTag.classList.contains('correct')) {
                allCorrect = false
                break
            }
        }

        wordDiv.classList.remove('correctWord', 'incorrectWord')

        if (allCorrect) {
            wordDiv.classList.add('correctWord')
        } else {
            wordDiv.classList.add('incorrectWord')
        }
    }

    clearClassWhenBackspacing(letterTag) {
        if (
            letterTag.classList.contains('correct') ||
            letterTag.classList.contains('incorrect')
        ) {
            letterTag.classList.remove('correct', 'incorrect')
        }

        if (this.currentLetterIndex > 0) {
            this.currentLetterIndex--
            if (
                letterTag.classList.contains('correct') ||
                letterTag.classList.contains('incorrect')
            ) {
                this.clearClassWhenBackspacing(letterTag)
            } else {
                this.updateWordClass(letterTag.closest('.word'))
            }
        }
    }
}
