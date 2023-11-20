export class Poetry {
    constructor(textDivSelector) {
        this.textDiv = document.querySelector(textDivSelector)
        this.textDiv.innerHTML =
            '<h1 style="font-size: 80px; text-align: center; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">LOADING....</h1>'
        this.numberOfDivs = 0
    }

    async getPoetryText() {
        const randomLineCount = Math.floor(Math.random() * 14) + 25
        const randomPoemIndex = Math.floor(Math.random() * 10)
        // I wanted a minimum and maximum amount of lines from the poetry. This would allow for the diversity of poems/lengths. Truly decrease the possibility of getting the same poem, the index of the which poem to pick from the given poemList.
        const response = await fetch(
            `https://poetrydb.org/linecount/${randomLineCount}`
            // 'https://poetrydb.org/title/Ozymandias/lines.json' this is for testing
        )
        const poetryArray = await response.json()
        const poetryArrayLines = poetryArray[0]['lines']
        const sanitizedArrays = this.cleanJSONdata(poetryArrayLines)

        this.textDiv.innerHTML = sanitizedArrays
        this.numberOfDivs = this.textDiv.childElementCount

        const setBackgroundColor = document.querySelector('.typingTest')
        setBackgroundColor.style.backgroundColor = '#aaa4995c'
    }

    getNumberOfDivs() {
        //utilized during testing phase
        return this.numberOfDivs
    }

    LetterTagsAndRemoveNonAlphaNum(word) {
        return word
            .split('')
            .map((char) => {
                if (/^[a-zA-Z0-9]+$/.test(char)) {
                    return `<span class='letter'>${char.toLowerCase()}</span>`
                } else {
                    return ''
                }
            })
            .join('')
    }

    wrapWordsFromArray(line) {
        return line
            .split(/\s+/)
            .filter((word) => word !== '')
            .map(
                (word) =>
                    `<div class='word'>${this.LetterTagsAndRemoveNonAlphaNum(
                        word
                    )}</div>`
            )
            .join('')
    }

    cleanJSONdata(arrOfArr) {
        return arrOfArr
            .map((line) => this.wrapWordsFromArray(line))
            .filter((str) => str !== '')
            .join(' ')
    }
}
