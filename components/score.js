import * as gameState from './viewScoreBtn.js'
function returnGraph(entry, clock) {
    return {
        x: [`${entry.date} ${entry.time}`],
        y: [(entry.wordsCorrect / clock) * 60],
        type: 'bar',
        name: `WPM ${(entry.wordsCorrect / clock) * 60}`,
    }
}
//keeping for future updates
// function displayWPMElement(entry, clock) {
//     const wpmElement = document.createElement('p')
//     wpmElement.textContent = `${entry.date} ${entry.time}: ${Math.floor(
//         (entry.wordsCorrect / clock) * 60
//     )} WPM`
//     return wpmElement
// }

export function determineWPM(wordsCorrect, wordsIncorrect, wordsTotal) {
    const test = document.querySelector('.typingTest')
    test.style.display = 'none'
    const body = document.querySelector('.chart')
    const clock = 30

    const storedData = JSON.parse(localStorage.getItem('wordData')) || []

    const currentDate = new Date()
    storedData.push({
        date: currentDate.toLocaleDateString(),
        time: currentDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        }),
        wordsCorrect,
        wordsIncorrect,
        wordsTotal,
    })

    const lastThreeData = storedData.slice(-3)

    localStorage.setItem('wordData', JSON.stringify(lastThreeData))

    console.log(
        'wordsCorrect: ',
        wordsCorrect,
        'wordsIncorrect: ',
        wordsIncorrect,
        'Total: ',
        wordsTotal
    )

    const data = lastThreeData.map((entry) => returnGraph(entry, clock))

    const layout = {
        xaxis: { type: 'category' },
        plot_bgcolor: '#ebe3d5',
        paper_bgcolor: '#ebe3d5',
    }

    const wpmElement = document.createElement('h1')
    wpmElement.textContent = `Your WPM: ${Math.floor(
        (wordsCorrect / clock) * 60
    )}`

    body.parentNode.insertBefore(wpmElement, body)

    Plotly.newPlot(body, data, layout)
}

export function displayScores() {
    const clock = 30
    const body = document.querySelector('.chart')
    const test = document.querySelector('.typingTest')
    const timer = document.querySelector('#timer')
    test.style.display = 'none'
    // timer.style.display = 'none'

    const storedData = JSON.parse(localStorage.getItem('wordData')) || []

    const lastThreeData = storedData.slice(-3)

    const data = lastThreeData.map((entry) => returnGraph(entry, clock))

    const layout = {
        xaxis: {
            type: 'category',
            categoryorder: 'category ascending',
        },
        plot_bgcolor: '#ebe3d5',
        paper_bgcolor: '#ebe3d5',
    }

    Plotly.newPlot(body, data, layout)
}

export function handleShowScoresClick(event) {
    event.preventDefault()

    const storedData = JSON.parse(localStorage.getItem('wordData')) || []

    if (storedData.length > 0) {
        displayScores()
        gameState.disableKeyPress()
        return
    } else {
        alert('No data available to display.')
    }
}

const showScoresLink = document.getElementById('showScores')
if (showScoresLink) {
    showScoresLink.addEventListener('click', handleShowScoresClick)
}
