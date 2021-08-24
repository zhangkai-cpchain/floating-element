<template>
  <div></div>
</template>

<script>
import {
  Transformation, Moving, TextShining, RandomTrack
} from '../../../dist/index'
export default {
  created () {
    var texts = []
    for (let i = 0; i < 50; i++) {
      var text = new Transformation()
        .setAnimation(new Moving().setTrack(new RandomTrack({ x: 0, y: 0 })))
        .setAnimation(new TextShining())
        .appendChild(i.toString(2))
      texts.push(text)
    }

    function start () {
      for (let i = 0; i < texts.length; i++) {
        texts[i].draw()
      }

      window.requestAnimationFrame(start)
    }
    start()
  }
}
</script>
