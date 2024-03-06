let board = new Array()
let edgeNum = 4
let score
let flag
let endBtn = document.querySelector('.over .modal-footer .btn-primary')
let scoreClass = document.querySelector('.nav .score .number')
let historyClass = document.querySelector('.nav .score .history')

newgame()

function newgame() {
  init()
  createNum()
  createNum()
}

function init() {
  score = 0
  for (let i = 0; i < edgeNum; ++i) {
    board[i] = new Array()
    for (let j = 0; j < edgeNum; ++j) {
      board[i][j] = 0
      let grid = document.querySelector(`#grid-container #grid-cell-${i}-${j}`)
      grid.innerHTML = ''
      grid.className = 'grid-cell'
      grid.style.top = 20 + 120 * i + 'px'
      grid.style.left = 20 + 120 * j + 'px'
    }
  }
  scoreClass.innerHTML = score
  if (localStorage.getItem('history_best_score')) {
    historyClass.innerHTML = localStorage.getItem('history_best_score')
  } else {
    historyClass.innerHTML = score
  }
}

function createNum() {
  let count = 0
  let temp = new Array()
  for (let i = 0; i < edgeNum; ++i) {
    for (let j = 0; j < edgeNum; ++j) {
      if (board[i][j] === 0) {
        temp[count++] = i * edgeNum + j
      }
    }
  }
  let pos = Math.floor(Math.random() * count)
  let x = Math.floor(temp[pos] / edgeNum)
  let y = Math.floor(temp[pos] % edgeNum)
  let randnum = Math.random() < 0.5 ? 2 : 4

  board[x][y] = randnum
  let grid = document.querySelector(`#grid-cell-${x}-${y}`)
  grid.className = `grid-cell n${randnum}`
  grid.innerHTML = randnum
}

function moveLeft() {
  flag = false
  for (let i = 0; i < edgeNum; ++i) {
    let writePos = 0
    let last = null
    for (let j = 0; j < edgeNum; ++j) {
      let cur = board[i][j]
      if (cur === 0) {
        continue
      }
      if (cur === last) {
        board[i][writePos - 1] *= 2
        score += board[i][writePos - 1]
        last *= 2
        let before = document.querySelector(`#grid-cell-${i}-${j}`)
        let after = document.querySelector(`#grid-cell-${i}-${writePos - 1}`)
        before.innerHTML = ''
        before.className = 'grid-cell'
        after.innerHTML = board[i][writePos - 1]
        after.className = `grid-cell n${board[i][writePos - 1]}`
        continue
      }
      board[i][writePos] = cur
      if (writePos !== j) {
        let ori = document.querySelector(`#grid-cell-${i}-${j}`)
        ori.innerHTML = ''
        ori.className = 'grid-cell'
      }
      let target = document.querySelector(`#grid-cell-${i}-${writePos}`)
      target.innerHTML = cur
      target.className = `grid-cell n${cur}`
      writePos++
      last = cur
    }
    if (writePos < edgeNum) {
      flag = true
      for (let j = writePos; j < edgeNum; ++j) {
        board[i][j] = 0
        let left = document.querySelector(`#grid-cell-${i}-${j}`)
        left.innerHTML = ''
        left.className = 'grid-cell'
      }
    }
  }
  return flag
}

function moveRight() {
  flag = false
  for (let i = edgeNum - 1; i >= 0; --i) {
    let writePos = edgeNum - 1
    let last = null
    for (let j = edgeNum - 1; j >= 0; --j) {
      let cur = board[i][j]
      if (cur === 0) {
        continue
      }
      if (cur === last) {
        board[i][writePos + 1] *= 2
        score += board[i][writePos + 1]
        last *= 2
        let before = document.querySelector(`#grid-cell-${i}-${j}`)
        let after = document.querySelector(`#grid-cell-${i}-${writePos + 1}`)
        before.innerHTML = ''
        before.className = 'grid-cell'
        after.innerHTML = board[i][writePos + 1]
        after.className = `grid-cell n${board[i][writePos + 1]}`
        continue
      }
      board[i][writePos] = cur
      if (writePos !== j) {
        let ori = document.querySelector(`#grid-cell-${i}-${j}`)
        ori.innerHTML = ''
        ori.className = 'grid-cell'
      }
      let target = document.querySelector(`#grid-cell-${i}-${writePos}`)
      target.innerHTML = cur
      target.className = `grid-cell n${cur}`
      writePos--
      last = cur
    }
    if (writePos >= 0) {
      flag = true
      for (let j = writePos; j >= 0; --j) {
        board[i][j] = 0
        let left = document.querySelector(`#grid-cell-${i}-${j}`)
        left.innerHTML = ''
        left.className = 'grid-cell'
      }
    }
  }
  return flag
}

function moveUp() {
  flag = false
  for (let i = 0; i < edgeNum; ++i) {
    let writePos = 0
    let last = null
    for (let j = 0; j < edgeNum; ++j) {
      let cur = board[j][i]
      if (cur === 0) {
        continue
      }
      if (cur === last) {
        board[writePos - 1][i] *= 2
        score += board[writePos - 1][i]
        last *= 2
        let before = document.querySelector(`#grid-cell-${j}-${i}`)
        let after = document.querySelector(`#grid-cell-${writePos - 1}-${i}`)
        before.innerHTML = ''
        before.className = 'grid-cell'
        after.innerHTML = board[writePos - 1][i]
        after.className = `grid-cell n${board[writePos - 1][i]}`
        continue
      }
      board[writePos][i] = cur
      if (writePos !== j) {
        let ori = document.querySelector(`#grid-cell-${j}-${i}`)
        ori.innerHTML = ''
        ori.className = 'grid-cell'
      }
      let target = document.querySelector(`#grid-cell-${writePos}-${i}`)
      target.innerHTML = cur
      target.className = `grid-cell n${cur}`
      writePos++
      last = cur
    }
    if (writePos < edgeNum) {
      flag = true
      for (let j = writePos; j < edgeNum; ++j) {
        board[j][i] = 0
        let left = document.querySelector(`#grid-cell-${j}-${i}`)
        left.innerHTML = ''
        left.className = 'grid-cell'
      }
    }
  }
  return flag
}

function moveDown() {
  flag = false
  for (let i = edgeNum - 1; i >= 0; --i) {
    let writePos = edgeNum - 1
    let last = null
    for (let j = edgeNum - 1; j >= 0; --j) {
      let cur = board[j][i]
      if (cur === 0) {
        continue
      }
      if (cur === last) {
        board[writePos + 1][i] *= 2
        score += board[writePos + 1][i]
        last *= 2
        let before = document.querySelector(`#grid-cell-${j}-${i}`)
        let after = document.querySelector(`#grid-cell-${writePos + 1}-${i}`)
        before.innerHTML = ''
        before.className = 'grid-cell'
        after.innerHTML = board[writePos + 1][i]
        after.className = `grid-cell n${board[writePos + 1][i]}`
        continue
      }
      board[writePos][i] = cur
      if (writePos !== j) {
        let ori = document.querySelector(`#grid-cell-${j}-${i}`)
        ori.innerHTML = ''
        ori.className = 'grid-cell'
      }
      let target = document.querySelector(`#grid-cell-${writePos}-${i}`)
      target.innerHTML = cur
      target.className = `grid-cell n${cur}`
      writePos--
      last = cur
    }
    if (writePos >= 0) {
      flag = true
      for (let j = writePos; j >= 0; --j) {
        board[j][i] = 0
        let left = document.querySelector(`#grid-cell-${j}-${i}`)
        left.innerHTML = ''
        left.className = 'grid-cell'
      }
    }
  }
  return flag
}

function gameOver() {
  for (let i = 0; i < edgeNum; ++i) {
    for (let j = 0; j < edgeNum; ++j) {
      if (!board[i][j]) {
        return false
      }
    }
  }
  for (let i = 1; i < edgeNum - 1; ++i) {
    for (let j = 1; j < edgeNum - 1; ++j) {
      if (board[i][j] === board[i + 1][j] || board[i][j] === board[i - 1][j] || board[i][j] === board[i][j + 1] || board[i][j] === board[i][j - 1]) {
        return false
      }
    }
  }
  if (board[0][0] === board[0][1] || board[0][0] === board[1][0]) {
    return false
  }
  if (board[0][1] === board[0][2] || board[3][1] === board[3][2]) {
    return false
  }
  if (board[1][1] === board[1][2] || board[1][3] === board[2][3]) {
    return false
  }
  if (board[3][0] === board[3][1] || board[3][0] === board[2][0]) {
    return false
  }
  if (board[0][3] === board[0][2] || board[0][3] === board[1][3]) {
    return false
  }
  if (board[3][3] === board[3][2] || board[3][3] === board[2][3]) {
    return false
  }
  return true
}