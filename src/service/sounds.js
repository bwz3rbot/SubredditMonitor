const item = './sounds/elevator_bell.mp3'

const player = require('play-sound')(opts = {})

const playSound = function(){
    player.play(item, function (err) {
    if (err) throw err
})
}


module.exports = {
    playSound:playSound
}