// controls buttons var
const buttonPlay = document.querySelector('.play')
const buttonPause = document.querySelector('.pause')
const buttonSet = document.querySelector('.set')
const buttonStop = document.querySelector('.stop')
const buttonAddMinutes = document.querySelector('.addtime')
const buttonRemoveMinutes = document.querySelector('.removetime')

// options buttons var
let buttonForest = document.querySelector('.forest')
let buttonRain = document.querySelector('.rain')
let buttonCafe = document.querySelector('.cafe')
let buttonFire = document.querySelector('.fire')

// timer var
const minutesDisplay = document.querySelector('.minutes')
const secondsDisplay = document.querySelector('.seconds')
let minutes = Number(minutesDisplay.textContent)


//controls functions

function play() {
  buttonPlay.classList.add('hide')
  buttonSet.classList.add('hide')
  buttonPause.classList.remove('hide')
  buttonStop.classList.remove('hide')
}

function pause() {
  buttonPause.classList.add('hide')
  buttonPlay.classList.remove('hide')
}

function resetControls() {
  buttonStop.classList.add('hide')
  buttonPause.classList.add('hide')
  buttonSet.classList.remove('hide')
  buttonPlay.classList.remove('hide')
}

function getMinutes() {
  let newMinutes = prompt('quantos minutos?') 
  if (!newMinutes) {
    return false
  }

  return newMinutes
}

function addMinutes() {
  let minutes = Number(minutesDisplay.textContent)
  let seconds = Number(secondsDisplay.textContent)
  updateDisplay(Number(minutes + 5), seconds)
}

function removeMinutes() {
  let minutes = Number(minutesDisplay.textContent)
  let seconds = Number(secondsDisplay.textContent)
  updateDisplay(Number(minutes - 5), seconds)

  if(minutes <=5) {

    updateDisplay(minutes, seconds)
  }
}

// timer functions

let timerTimeOut

function countDown() {
  timerTimeOut = setTimeout(function() {
    let seconds = Number(secondsDisplay.textContent)
    let minutes = Number(minutesDisplay.textContent)

    updateDisplay(minutes, 0)

    if(minutes <= 0 && seconds == 0) {
      resetControls()
      return
    }
    
    
    if(seconds <= 0) {
      seconds = 60
      --minutes
    }
    
    updateDisplay(minutes, String(seconds - 1))

    countDown()

  }, 1000)
  
}

function updateDisplay(minutes, seconds) {
minutesDisplay.textContent = String(minutes).padStart(2, "0")
secondsDisplay.textContent = String(seconds).padStart(2, "0")
}

function resetTimer() {
updateDisplay(minutes, 0)
clearTimeout(timerTimeOut)
}

function updateMinutes(newMinutes) {
  minutes = newMinutes
}

function hold() {
  clearTimeout(timerTimeOut)
}


//controls 
buttonPlay.addEventListener('click', function() {
  play()
  countDown()
  
})

buttonPause.addEventListener('click', function() {
  pause()
  hold()
  
})

buttonStop.addEventListener('click', function() {
  resetControls()
  resetTimer()
    return
})

buttonSet.addEventListener('click', function() {
  let newMinutes = getMinutes()
  if (!newMinutes) {
    resetTimer()
    return
  }

  minutes = newMinutes
  updateDisplay(minutes, 0)
  updateMinutes(minutes)
})

buttonAddMinutes.addEventListener('click', function() {
  addMinutes()
})

buttonRemoveMinutes.addEventListener('click', function() {
  removeMinutes()
})



//////////////////options buttons

// sound


function switchSound() {
  const forestSound = new Audio('./sounds/Floresta.wav')
  const rainSound = new Audio('./sounds/Chuva.wav')
  const cafeSound = new Audio('./sounds/Cafeteria.wav')
  const fireSound = new Audio('./sounds/Lareira.wav')

  forestSound.loop, rainSound.loop, fireSound.loop, cafeSound.loop = true

  
function soundForestOn() {
  forestSound.play()
  rainSound.pause()
  cafeSound.pause()
  fireSound.pause()
  }

    
function soundRainOn() {
  forestSound.pause()
  rainSound.play()
  cafeSound.pause()
  fireSound.pause()
  }

function soundCafeOn() {
  forestSound.pause()
  rainSound.pause()
  cafeSound.play()
  fireSound.pause()
  }

function soundFireOn() {
  forestSound.pause()
  rainSound.pause()
  cafeSound.pause()
  fireSound.play()
  }

  return {
    soundForestOn,
    soundRainOn,
    soundCafeOn,
    soundFireOn
  }

}

const sound = switchSound()

buttonForest.addEventListener('click', function() {
  buttonForest.classList.add('selected')
  buttonRain.classList.remove('selected')
  buttonCafe.classList.remove('selected')
  buttonFire.classList.remove('selected')

  sound.soundForestOn()
})

buttonRain.addEventListener('click', function() {
  buttonRain.classList.add('selected')
  buttonForest.classList.remove('selected')
  buttonCafe.classList.remove('selected')
  buttonFire.classList.remove('selected')  

  sound.soundRainOn()
})

buttonCafe.addEventListener('click', function() {
  buttonCafe.classList.add('selected')
  buttonForest.classList.remove('selected')
  buttonRain.classList.remove('selected')
  buttonFire.classList.remove('selected')

  sound.soundCafeOn()
})

buttonFire.addEventListener('click', function() {
  buttonFire.classList.add('selected')

  buttonForest.classList.remove('selected')
  buttonRain.classList.remove('selected')
  buttonCafe.classList.remove('selected')

  sound.soundFireOn()
})

