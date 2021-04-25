"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lightMax = 200;
var lightMin = 100;
exports.RandomNum = function (num1, num2) {
    return Math.floor(Math.random() * (num2 - num1 + 1) + num1);
};
exports.RandomColor = function () {
    return "rgba(" + exports.RandomNum(0, 255) + "," + exports.RandomNum(0, 255) + "," + exports.RandomNum(0, 255) + "," + Math.random() + ")"; //随机颜色
};
var Transformation = /** @class */ (function () {
    function Transformation(container) {
        this.animations = [];
        this.element = document.createElement("div");
        (container || document.body).appendChild(this.element);
    }
    Transformation.prototype.initCssText = function (cssText) {
        this.cssText = cssText;
        return this;
    };
    Transformation.prototype.setClass = function (c) {
        this.element.className = c;
    };
    Transformation.prototype.setAnimation = function (animation) {
        this.animations.push(animation.setElement(this.element));
        return this;
    };
    Transformation.prototype.appendChild = function (child) {
        this.element.append(child);
        return this;
    };
    Transformation.prototype.draw = function () {
        this.element.style.cssText = this.cssText;
        this.animations.forEach(function (animation) {
            animation.draw();
        });
    };
    return Transformation;
}());
exports.Transformation = Transformation;
var RandomTrack = /** @class */ (function () {
    function RandomTrack(speed) {
        this.speed = speed;
        if (!speed)
            this.speed = { x: exports.RandomNum(-1, 1), y: exports.RandomNum(-1, 1) };
    }
    RandomTrack.prototype.calculation = function (position) {
        position.x += this.speed.x;
        position.y += this.speed.y;
        if (position.x >= window.screen.availWidth || position.x <= 0) {
            this.speed.x = -this.speed.x; //改变方向
        }
        if (position.y >= window.screen.availHeight || position.y <= 0) {
            this.speed.y = -this.speed.y; //改变方向
        }
        return position;
    };
    return RandomTrack;
}());
exports.RandomTrack = RandomTrack;
var UpTrack = /** @class */ (function () {
    function UpTrack(speed) {
        this.speed = speed;
        if (!speed)
            this.speed = { x: exports.RandomNum(-0.1, 0.1), y: exports.RandomNum(-3, 0) };
    }
    UpTrack.prototype.calculation = function (position) {
        position.x += this.speed.x;
        position.y += this.speed.y;
        if (position.x >= window.screen.availWidth || position.x <= 0) {
            this.speed.x = -this.speed.x; // 
        }
        if (position.y <= 0) {
            position.y += window.screen.availHeight;
            this.speed = { x: exports.RandomNum(-1, 1), y: exports.RandomNum(-1, 1) };
        }
        return position;
    };
    return UpTrack;
}());
exports.UpTrack = UpTrack;
var DownTrack = /** @class */ (function () {
    function DownTrack(speed) {
        this.speed = speed;
        if (!speed)
            this.speed = { x: exports.RandomNum(0.1, 0.3) - 0.2, y: exports.RandomNum(1, 3) };
    }
    DownTrack.prototype.calculation = function (position) {
        position.x += this.speed.x;
        position.y += this.speed.y;
        if (position.x >= window.screen.availWidth || position.x <= 0) {
            this.speed.x = -this.speed.x; // 
        }
        if (position.y >= window.screen.availHeight) {
            position.y -= window.screen.availHeight;
            this.speed = { x: exports.RandomNum(-1, 1), y: exports.RandomNum(-1, 1) };
        }
        return position;
    };
    return DownTrack;
}());
exports.DownTrack = DownTrack;
var SpreadTrack = /** @class */ (function () {
    function SpreadTrack(speed) {
        this.speed = speed;
        if (!speed)
            this.speed = { x: exports.RandomNum(-1, 1), y: exports.RandomNum(-1, 1) };
    }
    SpreadTrack.prototype.calculation = function (position) {
        position.x += this.speed.x;
        position.y += this.speed.y;
        if (position.x >= window.screen.availWidth || position.x <= 0 || position.y >= window.screen.availHeight || position.y <= 0) {
            position.x = window.screen.availWidth / 2 + exports.RandomNum(-100, 100);
            position.y = window.screen.availHeight / 2 + exports.RandomNum(-100, 100);
            this.speed = { x: exports.RandomNum(-1, 1), y: exports.RandomNum(-1, 1) };
        }
        return position;
    };
    return SpreadTrack;
}());
exports.SpreadTrack = SpreadTrack;
var Moving = /** @class */ (function () {
    function Moving(position) {
        this.position = position;
        if (!position)
            this.position = { x: exports.RandomNum(100, (window.screen.availWidth - 100)), y: exports.RandomNum(100, (window.screen.availHeight - 100)) };
        this.track = new RandomTrack();
    }
    Moving.prototype.setTrack = function (track) {
        this.track = track;
        return this;
    };
    Moving.prototype.setElement = function (element) {
        this.element = element;
        return this;
    };
    Moving.prototype.draw = function () {
        this.position = this.track.calculation(this.position);
        var cssText = " \n        \t\tleft:" + this.position.x + "px;\n        \t\ttop:" + this.position.y + "px;\n        \t\tposition: fixed;\n        \t";
        this.element.style.cssText += cssText;
    };
    return Moving;
}());
exports.Moving = Moving;
var Lighting = /** @class */ (function () {
    function Lighting(shadow, speed, color) {
        this.shadow = shadow;
        this.speed = speed;
        this.color = color;
        if (!shadow)
            this.shadow = exports.RandomNum(50, 150);
        if (!speed)
            this.speed = (exports.RandomNum(-1, 1));
        if (!color)
            this.color = 'rgba(255,255,255,0.3)';
    }
    Lighting.prototype.setElement = function (element) {
        this.element = element;
        return this;
    };
    Lighting.prototype.draw = function () {
        this.shadow = this.shadow + this.speed;
        if (this.shadow >= lightMax || this.shadow <= lightMin) {
            this.speed = -this.speed;
        }
        var cssText = "\n\t\t\tbox-shadow:0px 0px " + this.shadow + "px " + this.shadow + "px " + this.color + ";\n\t\t";
        this.element.style.cssText += cssText;
    };
    return Lighting;
}());
exports.Lighting = Lighting;
var TextShining = /** @class */ (function () {
    function TextShining(light, speed) {
        this.light = light;
        this.speed = speed;
        if (!light)
            this.light = 2;
        if (!speed)
            this.speed = exports.RandomNum(1, 3) / 15;
    }
    TextShining.prototype.setElement = function (element) {
        this.element = element;
        return this;
    };
    TextShining.prototype.draw = function () {
        this.light = this.light + this.speed;
        if (this.light >= 8 || this.light <= 2) {
            this.speed = -this.speed;
        }
        this.element.style.color = "rgba(255,255,255," + this.light / 10 + ")";
    };
    return TextShining;
}());
exports.TextShining = TextShining;
