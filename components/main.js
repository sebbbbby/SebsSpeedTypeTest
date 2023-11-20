import { Poetry } from './getPoetry.js'
import { Game } from './gameMode.js'
import * as gameState from './viewScoreBtn.js'
const game = new Game()
const poetryInstance = new Poetry('.typingTest')

poetryInstance
    .getPoetryText()
    .then(() => {
        document.addEventListener('keydown', handleKeyDown)
    })
    .catch((error) => {
        console.error('Error fetching poetry text:', error)
    })

function handleKeyDown(event) {
    event.preventDefault()
    if (!gameState.allowKeyPress) {
        return // Do nothing when in viewScoreBtn (over complicated but was additional feature to play with)
    }
    if (event.key === 'Enter') {
        event.preventDefault()
        game.restartGame()
    } else if (event.key === 'Escape') {
        event.preventDefault()
        location.reload()
    } else {
        game.startGame()
        game.playCurrentLetter(event.key)
        game.trackUserInputs(event.key)
    }
}
