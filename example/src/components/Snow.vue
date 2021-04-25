<template>
  <div></div>
</template>

<script>
import {
  Transformation, Moving, DownTrack
} from '../../../dist/index'
export default {
  created () {
    var snows = []

    for (let i = 0; i < 100; i++) {
      var snow = new Transformation()
        .setClass('snow')
        .setAnimation(new Moving().setTrack(new DownTrack()))
      snows.push(snow)// 生成的小球对象放进数组
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
  height: 40px;
  width: 40px;
}
</style>>
