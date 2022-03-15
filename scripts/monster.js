(function init () {

  let monster = []
  let left = []
  let right = []
  let canvasList = []
  let size = 25
  let w = 13
  let h = 9
  let half = Math.floor(w/2)
  let margin = size * 3
  let width = w * size + 2 * margin
  let height = h * size + 2 * margin
  let monsterNum = 1
  let color = 'white'

  getMonster()

  for (let m = 0; m < monsterNum; m++) {
    let canvas = document.createElement('canvas')
    document.body.appendChild(canvas)
    canvasList.push(canvas)
    canvas.width = width;
    canvas.height = height;
    drawMonster(canvas)
  }

  function randomColor () {
    return `rgb(${Math.round(Math.random() * 255)},
                ${Math.round(Math.random() * 255)},
                ${Math.round(Math.random() * 255)})`
  }

  function draw (x, y) {
    let chance = 10
    if ((x < half-1 && x > 2) && (y< h/2 && y > 2)) { // eyes
      chance = 0.8
    } else if (x > 1 && (y>(h/3)*2 && y<h)) { // bottom
      chance = 0.7
    } else if (x > 2 && (y<(h/3)-2)) { // top
      chance = 0.9
    } else if ((x === 0 && y === 0) || (x === 0 && y === h-1)) { // corder
      chance = 0.6
    } else if (x <= 1 && y !== h/2) { // edge
      chance = 1
    }

    let random = Math.random() * chance
    return Math.round(random) !== 0
  }

  function getMonster () {
    monster = []
  	left = []
  	right = []

  	for (let i = 0; i<h; i++) {
  		left.push([])
  		right.push([])

  		for (let j = 0; j<=half; j++) {
        if (j === half) {
          right[i] = left[i].slice(0)
      		right[i] = right[i].reverse()
        }

        draw(j, i) ? left[i].push(1) : left[i].push(0)
  		}

  		let unite = left[i].concat(right[i])
  		monster.push(unite)
  	}
  }


  function drawMonster (canvas) {
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = randomColor()
    // ctx.strokeStyle = 'white'

    monster.forEach((l, li) => {
      l.forEach((r, ri) => {
        if (r === 1) {
          let y = margin + li * size
          let x = margin + ri * size
          ctx.beginPath()
          ctx.rect(x, y, size, size)
          ctx.fill()
          // ctx.stroke()
          ctx.closePath()
        }
      })
    })
  }

  let generateBtn = document.querySelector('button[name="generate"]')
  generateBtn.addEventListener('click', () => {
    getMonster()
    canvasList.forEach((canvas) => {
      drawMonster(canvas)
    })
  })

  let saveBtn = document.querySelector('button[name="download"]')
  saveBtn.addEventListener('click', () => {
    saveMonster()
  })

  function saveMonster () {
    canvasList.forEach((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, `monster_brigittaforrai.png`);
      }, 'image/png', 1)
    })
  }
})()
