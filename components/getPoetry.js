export class Poetry {
    constructor(textDivSelector) {
        this.textDiv = document.querySelector(textDivSelector)
        this.textDiv.innerHTML =
            '<h1 style="font-size: 80px; text-align: center; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">LOADING....</h1>'
        this.numberOfDivs = 0
    }

    async getPoetryText() {
        try {
            const randomLineCount = Math.floor(Math.random() * 14) + 25
            const randomPoemIndex = Math.floor(Math.random() * 10)
            const response = await fetch(
                `https://poetrydb.org/linecount/${randomLineCount}`
            )
            if (!response.ok) {
                throw new Error(
                    `Failed to fetch poetry. Status: ${response.status}`
                )
            }

            const poetryArray = await response.json()
            if (
                !Array.isArray(poetryArray) ||
                poetryArray.length === 0 ||
                !poetryArray[0].lines
            ) {
                throw new Error('Invalid poetry data received')
            }

            const poetryArrayLines = poetryArray[0].lines
            const sanitizedArrays = this.cleanJSONdata(poetryArrayLines)

            this.textDiv.innerHTML = sanitizedArrays
            this.numberOfDivs = this.textDiv.childElementCount

            const setBackgroundColor = document.querySelector('.typingTest')
            setBackgroundColor.style.backgroundColor = '#aaa4995c'
        } catch (error) {
            console.error('Error fetching poetry:', error.message)
        }
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
