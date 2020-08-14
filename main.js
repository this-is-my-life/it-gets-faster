(() => {
  let beat = 0, mspb = 1000, pressedAt = Date.now(), diff = 100
  let interval = setInterval(fn, mspb)
  const beatdown = new Howl({ src: './bin/beatdown.ogg' })
  const beatup = new Howl({ src: './bin/beatup.ogg' })
  const ani_beatup = anime.timeline({
    targets: ['.bg'],
    easing: 'easeInOutQuad'
  });
  const ani_beatdown = anime.timeline({
    targets: ['.bg'],
    easing: 'easeInOutQuad'
  });
  const ani_beat = anime.timeline({
    targets: ['.bg'],
    easing: 'easeInOutQuad'
  });

  ani_beatup.add({
    backgroundColor: '#68D47D',
    duration: 300
  })

  ani_beatup.add({
    backgroundColor: '#2C2F33',
    duration: 200
  })
  
  ani_beatdown.add({
    backgroundColor: '#EB4E53',
    duration: 300
  })

  ani_beatdown.add({
    backgroundColor: '#2C2F33',
    duration: 200
  })

  ani_beat.add({
    backgroundColor: '#3C3E4A',
    duration: 300
  })

  ani_beat.add({
    backgroundColor: '#2C2F33',
    duration: 200
  })

  function fn () {
    beat++
    let ccDate = beatAt = Date.now()
    if (beat > 3) beat = 0

    document.getElementsByTagName('h2')[0]
      .innerHTML = beat + ' | 1 beat per ' + mspb + 'ms | allow &plusmn;' + diff + 'ms'

    if (beat === 0) {
      beatdown.play()
      setTimeout(() => {
        let lowDate = ccDate - diff
        let highDate = ccDate + diff
        console.log('real:', pressedAt, '| cutlow:', lowDate, '| cuthigh:', highDate, '| plusmn:', diff)
        if (pressedAt > lowDate && pressedAt < highDate) {
          mspb -= 50
          diff -= 5
          ani_beatup.play()
        } else if (mspb < 1000) {
          mspb += 50
          diff += 5
          ani_beatdown.play()
        }
      }, 10)
    } else {
      ani_beat.play()
      beatup.play()
    }
    
    console.log('Beat:', beat, '| mspb: ', mspb)
    
    clearInterval(interval)
    if (mspb > 0) interval = setInterval(fn, mspb)
  }

  window.addEventListener('keydown', (ev) => {
    if (ev.repeat && mspb < 1000) {
      mspb += 50
      diff += 5
    }
    pressedAt = Date.now()
  })
})()
