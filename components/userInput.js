const SPACE_KEY = ' '
const BACKSPACE_KEY = 'Backspace'

export class UserInputHandler {
    constructor(game) {
        this.game = game
    }
    //trackUserInputs is keep track of elements found in the array to ensure something was typed. also helps during dev phase
    trackUserInputs(param) {
        if (param !== SPACE_KEY && param !== BACKSPACE_KEY) {
            this.game.userInputs.push(param)
        }
    }

    playCurrentLetter(param) {
        const wordDivs = this.game.typingTestElement.querySelectorAll('.word')
        const wordDiv = wordDivs[this.game.currentWordIndex]
        const letterTags = wordDiv.querySelectorAll('.letter')
        const currentLetterTag = letterTags[this.game.currentLetterIndex]
        console.log('no backspace: ', currentLetterTag)
        if (!wordDiv) {
            console.log(
                'Word div not found at provided index:',
                this.game.currentWordIndex
            )
            return
        }

        if (!currentLetterTag) {
            console.log(
                'Letter tag not found at provided index:',
                this.game.currentLetterIndex
            )
            return
        }

        const compare = currentLetterTag.textContent.trim()

        if (
            param === SPACE_KEY &&
            this.game.currentWordIndex < wordDivs.length - 1 &&
            this.game.userInputs.length > 0
        ) {
            this.game.currentWordIndex++
            this.game.currentLetterIndex = 0
            this.game.userInputs = []
        }

        if (this.game.userInputs.length > 0 && param === SPACE_KEY) {
            this.game.currentWordIndex++
            this.game.userInputs = []
        }

        if (param !== SPACE_KEY && param !== BACKSPACE_KEY) {
            const isCorrect = param.toLowerCase() === compare.toLowerCase()
            if (isCorrect) {
                this.game.correctInput(currentLetterTag)
            } else {
                this.game.wrongInput(currentLetterTag)
            }

            this.game.updateWordClass(wordDiv)

            if (this.game.currentLetterIndex < letterTags.length - 1) {
                this.game.currentLetterIndex++
            } else {
                return
            }

            console.log('letter tags: ', letterTags)
        }
        if (param === BACKSPACE_KEY) {
            this.game.clearClassWhenBackspacing(currentLetterTag)
            console.log(currentLetterTag)
        }
    }
}
