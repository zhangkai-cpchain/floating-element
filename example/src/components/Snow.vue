<template>
  <div></div>
</template>

<script>
import {
  Transformation, Moving, DownTrack, SizeChanging, Rotating
} from '../../../dist/index'
export default {
  created () {
    var snows = []

    for (let i = 0; i < 50; i++) {
      var snow = new Transformation()
        .setClass('snow')
        .setAnimation(new Moving().setTrack(new DownTrack()))
        .setAnimation(new SizeChanging())
        .setAnimation(new Rotating())
      snows.push(snow)
    }

    function start () {
      for (let i = 0; i < snows.length; i++) {
        snows[i].draw()
      }

      window.requestAnimationFrame(start)
    }
    start()
  }
}
</script>

<style>
.snow {
  background: url("../assets/snow.png");
  border-radius: 50%;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>>
