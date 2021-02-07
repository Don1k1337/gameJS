let $start = document.querySelector('#start')
let $game = document.querySelector('#game')
let $time = document.querySelector('#time')
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')
let $result = document.querySelector('#result')
let score = 0
let isGameStarted = false

const startGame = () => {
    score = 0
    setGameTime()
    $timeHeader.classList.remove('hide')
    $resultHeader.classList.add('hide')
    isGameStarted = true
    $game.style.backgroundColor = '#fff'
    $start.classList.add('hide')

    let interval = setInterval(() => {
        let time = parseFloat($time.textContent)
        if (time <= 0) {
            // ending game
            clearInterval(interval)
            endGame()
        } else {
            $time.textContent = (time - 0.1).toFixed(1)
        }
    }, 100)
    renderBox()
}

const setGameScore =() => {
    $result.textContent = score.toString()
}

$start.addEventListener('click', startGame)
const renderBox = () => {
    $game.innerHTML = ''
    let box = document.createElement('div')
    let boxSize = getRandom(30, 100)
    let gameSize = $game.getBoundingClientRect()
    let maxTop = gameSize.height - boxSize
    let maxLeft = gameSize.width - boxSize

    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = '#000'
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
    box.style.color = 
    box.setAttribute('data-box', 'true')

    $game.insertAdjacentElement("afterbegin", box)
}

const handleBoxClick = (event) => {
    // if (isGameStarted) {
    //     event.target.dataset.box
    //     score++
    //     renderBox()
    // } else {
    //     endGame()
    // }
    if (!isGameStarted) {
        return
    }
    if (event.target.dataset.box) {
        score++
        renderBox()
    }
}

$game.addEventListener('click', handleBoxClick)

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

const setGameTime = () => {
    let time = 5
    $time.textContent = time.toFixed(1) 
}

const endGame = () => {
    isGameStarted = false
    setGameScore()
    $start.classList.remove('hide')
    $game.innerHTML = ''
    $game.style.backgroundColor = '#ccc'
    $timeHeader.classList.add('hide')
    $resultHeader.classList.remove('hide')
}