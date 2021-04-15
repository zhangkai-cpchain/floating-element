const lightMax = 200;
const lightMin = 100;
const RandomNum = (num1, num2) => {
    return Math.floor(Math.random() * (num2 - num1 + 1) + num1);
};
export class Transformation {
    constructor(container) {
        this.animations = [];
        this.element = document.createElement("div");
        (container || document.body).appendChild(this.element);
    }
    initCssText(cssText) {
        this.cssText = cssText;
    }
    setAnimation(animation) {
        this.animations.push(animation.setElement(this.element));
        return this;
    }
    appendChild(child) {
        this.element.append(child);
        return this;
    }
    draw() {
        this.element.style.cssText = this.cssText;
        this.animations.forEach(animation => {
            animation.draw();
        });
    }
}
export class RandomTrack {
    constructor(speed) {
        this.speed = speed;
        if (!speed)
            this.speed = { x: RandomNum(1, 3) - 2, y: RandomNum(1, 3) - 2 };
    }
    calculation(position) {
        position.x += this.speed.x;
        position.y += this.speed.y;
        if (position.x >= window.screen.availWidth || position.x <= 0) {
            this.speed.x = -this.speed.x; //改变方向
        }
        if (position.y >= window.screen.availHeight || position.y <= 0) {
            this.speed.y = -this.speed.y; //改变方向
        }
        return position;
    }
}
export class UpTrack {
    constructor(speed) {
        this.speed = speed;
        if (!speed)
            this.speed = { x: RandomNum(0.1, 0.3) - 0.2, y: RandomNum(1, 3) - 3 };
    }
    calculation(position) {
        position.x += this.speed.x;
        position.y += this.speed.y;
        if (position.x >= window.screen.availWidth || position.x <= 0) {
            this.speed.x = -this.speed.x; // 
        }
        if (position.y <= 0) {
            position.y += window.screen.availHeight;
        }
        return position;
    }
}
export class DownTrack {
    constructor(speed) {
        this.speed = speed;
        if (!speed)
            this.speed = { x: RandomNum(0.1, 0.3) - 0.2, y: RandomNum(1, 3) };
    }
    calculation(position) {
        position.x += this.speed.x;
        position.y += this.speed.y;
        if (position.x >= window.screen.availWidth || position.x <= 0) {
            this.speed.x = -this.speed.x; // 
        }
        if (position.y >= window.screen.availHeight) {
            position.y -= window.screen.availHeight;
        }
        return position;
    }
}
export class SpreadTrack {
    constructor(speed) {
        this.speed = speed;
        if (!speed)
            this.speed = { x: RandomNum(1, 3) - 2, y: RandomNum(1, 3) - 2 };
    }
    calculation(position) {
        position.x += this.speed.x;
        position.y += this.speed.y;
        if (position.x >= window.screen.availWidth || position.x <= 0 || position.y >= window.screen.availHeight || position.y <= 0) {
            position.x = window.screen.availWidth / 2;
            position.y = window.screen.availHeight / 2;
        }
        return position;
    }
}
export class Moving {
    constructor(position) {
        this.position = position;
        if (!position)
            this.position = { x: RandomNum(100, (window.screen.availWidth - 100)), y: RandomNum(100, (window.screen.availHeight - 100)) };
        this.track = new RandomTrack();
    }
    setTrack(track) {
        this.track = track;
    }
    setElement(element) {
        this.element = element;
        return this;
    }
    draw() {
        this.position = this.track.calculation(this.position);
        let cssText = ` 
        		left:${this.position.x}px;
        		top:${this.position.y}px;
        		position: fixed;
        	`;
        this.element.style.cssText += cssText;
    }
}
export class Lighting {
    constructor(shadow, speed, color) {
        this.shadow = shadow;
        this.speed = speed;
        this.color = color;
        if (!shadow)
            this.shadow = RandomNum(50, 150);
        if (!speed)
            this.speed = (RandomNum(1, 3) - 2);
        if (!color)
            this.color = 'rgba(255,255,255,0.3)';
    }
    setElement(element) {
        this.element = element;
        return this;
    }
    draw() {
        this.shadow = this.shadow + this.speed;
        if (this.shadow >= lightMax || this.shadow <= lightMin) {
            this.speed = -this.speed;
        }
        let cssText = `
			box-shadow:0px 0px ${this.shadow}px ${this.shadow}px ${this.color};
		`;
        this.element.style.cssText += cssText;
    }
}
export class TextShining {
    constructor(light, speed) {
        this.light = light;
        this.speed = speed;
        if (!light)
            this.light = 2;
        if (!speed)
            this.speed = RandomNum(1, 3) / 15;
    }
    setElement(element) {
        this.element = element;
        return this;
    }
    draw() {
        this.light = this.light + this.speed;
        if (this.light >= 8 || this.light <= 2) {
            this.speed = -this.speed;
        }
        this.element.style.color = `rgba(255,255,255,${this.light / 10})`;
    }
}
