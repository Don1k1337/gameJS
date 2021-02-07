let $start = document.querySelector('#start')
let $game = document.querySelector('#game')
let $time = document.querySelector('#time')
let $timeHeader = document.querySelector('#time-header')
let $resultHeader = document.querySelector('#result-header')
let $result = document.querySelector('#result')
let $gameTime = document.querySelector('#game-time')

let score = 0
let isGameStarted = false

let colors = ['red', 'green', 'blue', 'black']

const startGame = () => {
    score = 0
    setGameTime()
    $gameTime.setAttribute('disabled', true)
    isGameStarted = true
    $game.style.backgroundColor = '#fff'
    hide($start)

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

$start.addEventListener('click', startGame)
const setGameScore =() => {
    $result.textContent = score.toString()
}

const renderBox = () => {
    $game.innerHTML = ''
    let box = document.createElement('div')
    let boxSize = getRandom(30, 100)
    let gameSize = $game.getBoundingClientRect()
    let maxTop = gameSize.height - boxSize
    let maxLeft = gameSize.width - boxSize
    // let randomColorIndex = Math.floor(Math.random() * colors.length)
    let randomColorIndex = getRandom(0, colors.length)
    box.style.height = box.style.width = boxSize + 'px'
    box.style.position = 'absolute'
    box.style.backgroundColor = colors[randomColorIndex]
    box.style.top = getRandom(0, maxTop) + 'px'
    box.style.left = getRandom(0, maxLeft) + 'px'
    box.style.cursor = 'pointer'
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
    let time = +$gameTime.value // parsing to Int
    $time.textContent = time.toFixed(1)
    // showing changes in time 
    show($timeHeader)
    hide($resultHeader)
}

$gameTime.addEventListener('input', setGameTime)

const endGame = () => {
    isGameStarted = false
    setGameScore()
    $gameTime.removeAttribute('disabled')
    show($start)
    $game.innerHTML = ''
    $game.style.backgroundColor = '#ccc'
    hide($timeHeader)
    show($resultHeader)
}

const show = ($el) => {
    $el.classList.remove('hide')
}

const hide = ($el) => {
    $el.classList.add('hide')
}