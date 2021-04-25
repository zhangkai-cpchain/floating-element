"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../src/index");
var lights = [];
var texts = [];
var rectangles = [];
for (var i = 0; i < 20; i++) {
    var light = new index_1.Transformation()
        .setAnimation(new index_1.Moving())
        .setAnimation(new index_1.Lighting());
    lights.push(light); //生成的小球对象放进数组
}
for (var i = 0; i < 10; i++) {
    var text = new index_1.Transformation()
        .setAnimation(new index_1.Moving())
        .setAnimation(new index_1.TextShining())
        .appendChild((1 << (i + 20)).toString());
    texts.push(text); //生成的小球对象放进数组
}
for (var i = 0; i < 6; i++) {
    var rectangle = new index_1.Transformation()
        .initCssText('background:"#f00"')
        .setAnimation(new index_1.Moving());
    rectangles.push(rectangle); //生成的小球对象放进数组
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
    window.requestAnimationFrame(start);
}
start();
