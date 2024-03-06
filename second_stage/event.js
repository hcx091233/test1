document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') {
    if (moveRight()) {
      createNum()
    }
  } else if (e.key === 'ArrowLeft') {
    if (moveLeft()) {
      createNum()
    }
  } else if (e.key === 'ArrowDown') {
    if (moveDown()) {
      createNum()
    }
  } else {
    if (moveUp()) {
      createNum()
    }
  }
  scoreClass.innerHTML = score
  if (gameOver()) {
    if (!localStorage.getItem('history_best_score')) {
      localStorage.setItem('history_best_score', score)
      historyClass.innerHTML = score
    } else {
      if (localStorage.getItem('history_best_score') < score) {
        localStorage.setItem('history_best_score', score)
        historyClass.innerHTML = score
      }
    }
    document.querySelector('.over .modal-body span').innerHTML = score
    document.querySelector('.over .myover').click()
  }
})

endBtn.addEventListener('click', () => {
  document.querySelector('.over .modal-footer .btn-secondary').click()
  newgame()
})