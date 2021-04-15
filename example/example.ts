import { Transformation, Moving, TextShining, Lighting } from '../src/index'

var lights = [];
var texts = []
var rectangles = []

for (var i = 0; i < 20; i++) {
    var light = new Transformation()
        .setAnimation(new Moving())
        .setAnimation(new Lighting())
    lights.push(light);//生成的小球对象放进数组

}

for (var i = 0; i < 10; i++) {
    var text = new Transformation()
        .setAnimation(new Moving())
        .setAnimation(new TextShining())
        .appendChild((1 << (i + 20)).toString())
    texts.push(text);//生成的小球对象放进数组

}


for (var i = 0; i < 6; i++) {
    var rectangle = new Transformation( )
        .setAnimation(new Moving()) 
    rectangles.push(rectangle);//生成的小球对象放进数组

}



function start() {
    for (var i = 0; i < lights.length; i++) {
        lights[i].draw();
    }

    for (var i = 0; i < texts.length; i++) {
        texts[i].draw();
    }

    for (var i = 0; i < rectangles.length; i++) {
        rectangles[i].draw();
    }
    window.requestAnimationFrame(start)
}


start()