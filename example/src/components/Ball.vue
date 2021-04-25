<template>
  <div></div>
</template>

<script>
import {
  Transformation, Moving
} from '../../../dist/index'
export default {
  created () {
    var balls = []

    for (let i = 0; i < 10; i++) {
      var ball = new Transformation()
        .setClass('ball')
        .setAnimation(new Moving())
      balls.push(ball)// 生成的小球对象放进数组
    }

    function start () {
      for (let i = 0; i < balls.length; i++) {
        balls[i].draw()
      }

      window.requestAnimationFrame(start)
    }
    start()
  }
}
</script>

<style>
.ball {
  background: url("../assets/ball.png");
  border-radius: 50%;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  height:200px;
  width: 200px;

}
</style>>
