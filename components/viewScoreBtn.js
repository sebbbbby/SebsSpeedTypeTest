import { handleShowScoresClick } from './score.js'

export let allowKeyPress = true

export function disableKeyPress() {
    allowKeyPress = false
}

export function enableKeyPress() {
    allowKeyPress = true
}
const showScoresLink = document.getElementById('showScores')
if (showScoresLink) {
    showScoresLink.addEventListener('click', handleShowScoresClick)
}
