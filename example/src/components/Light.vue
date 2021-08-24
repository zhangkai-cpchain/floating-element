<template>
  <div></div>
</template>

<script>
import {
  Transformation, Moving, Lighting, SpreadTrack
} from '../../../dist/index'
export default {
  created () {
    var lights = []

    for (let i = 0; i < 10; i++) {
      var light = new Transformation()
        .setAnimation(new Moving().setTrack(new SpreadTrack()))
        .setAnimation(new Lighting())
      lights.push(light)
    }

    function start () {
      for (let i = 0; i < lights.length; i++) {
        lights[i].draw()
      }

      window.requestAnimationFrame(start)
    }
    start()
  }
}
</script>
