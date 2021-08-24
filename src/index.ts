interface IAnimation {
    element: HTMLElement
    setElement(element: HTMLElement): IAnimation
    draw(): void
}

interface ITrack {
    calculation(position: ElementPosition): ElementPosition
}

interface IMoving {
    track: ITrack
    setTrack(track: ITrack)
}

interface ElementPosition {
    x: number
    y: number
}

interface PositionSpeed {
    x: number
    y: number
}



const lightMax = 200
const lightMin = 100

const mousemove = []


export const RandomNum = (num1: number, num2: number): number => {
    return Math.floor(Math.random() * (num2 - num1 + 1) + num1);
}

export const RandomColor = () => {
    return "rgba(" + RandomNum(0, 255) + "," + RandomNum(0, 255) + "," + RandomNum(0, 255) + "," + Math.random() + ")";//随机颜色
}
export class Transformation {
    animations: IAnimation[] = []
    element: HTMLElement
    cssText: string
    constructor(container?: HTMLElement) {
        this.element = document.createElement("div");
        (container || document.body).appendChild(this.element);
    }
    initCssText(cssText) {
        this.cssText = cssText
        return this
    }
    setClass(c: string) {
        this.element.className = c;
        return this
    }
    setAnimation(animation: IAnimation) {
        this.animations.push(animation.setElement(this.element))
        return this
    }
    appendChild(child: HTMLElement | string) {
        this.element.append(child)
        return this
    }
    draw() {
        this.element.style.cssText = this.cssText
        this.animations.forEach(animation => {
            animation.draw()
        })
    }
}

export class RandomTrack implements ITrack {
    constructor(private speed?: PositionSpeed) {
        if (!speed) this.speed = { x: RandomNum(-1, 1), y: RandomNum(-1, 1) }
    }
    calculation(position: ElementPosition): ElementPosition {
        position.x += this.speed.x
        position.y += this.speed.y
        if (position.x >= window.screen.availWidth || position.x <= 0) {
            this.speed.x = -this.speed.x;//改变方向
        }
        if (position.y >= window.screen.availHeight || position.y <= 0) {
            this.speed.y = - this.speed.y;//改变方向
        }
        return position
    }
}
export class UpTrack implements ITrack {
    constructor(private speed?: PositionSpeed) {
        if (!speed) this.speed = { x: RandomNum(-0.1, 0.1), y: RandomNum(-3, 0) }
    }
    calculation(position: ElementPosition): ElementPosition {
        position.x += this.speed.x
        position.y += this.speed.y
        if (position.x >= window.screen.availWidth || position.x <= 0) {
            this.speed.x = -this.speed.x;// 
        }
        if (position.y <= 0) {
            position.y += window.screen.availHeight
            this.speed = { x: RandomNum(-1, 1), y: RandomNum(-1, 1) }
        }
        return position
    }
}

export class DownTrack implements ITrack {
    constructor(private speed?: PositionSpeed) {
        if (!speed) this.speed = { x: RandomNum(-0.1, 0.3) , y: RandomNum(2, 2.5) }
    }

    // 下降加速
    gravity(x: number) {
        return 1 + 0.5 * x / window.screen.availHeight
    }

    // getMouse() {
    //     var posX = 0, posY = 0;
    //     var event = event || window.event;
    //     if (event.pageX || event.pageY) {
    //         posX = event.pageX;
    //         posY = event.pageY;
    //     } else if (event.clientX || event.clientY) {
    //         posX = event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
    //         posY = event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
    //     }

    //     return {posX,posY}
    // }



    calculation(position: ElementPosition): ElementPosition {
        position.x += this.speed.x
        position.y += this.speed.y * this.gravity(position.y) 

        if (position.x >= window.screen.availWidth || position.x <= 0) {
            this.speed.x = -this.speed.x;// 
        }
        if (position.y >= window.screen.availHeight) {
            position.y -= window.screen.availHeight
        }
        return position
    }
}

export class SpreadTrack implements ITrack {
    constructor(private speed?: PositionSpeed) {
        if (!speed) this.speed = { x: RandomNum(-1, 1), y: RandomNum(-1, 1) }
    }
    calculation(position: ElementPosition): ElementPosition {
        position.x += this.speed.x
        position.y += this.speed.y
        if (position.x >= window.screen.availWidth || position.x <= 0 || position.y >= window.screen.availHeight || position.y <= 0) {

            position.x = window.screen.availWidth / 2 + RandomNum(-100, 100)
            position.y = window.screen.availHeight / 2 + RandomNum(-100, 100)

            this.speed = { x: RandomNum(-1, 1), y: RandomNum(-1, 1) }
        }

        return position
    }
}

export class Moving implements IAnimation, IMoving {
    track: ITrack;
    element: HTMLElement;
    constructor(private position?: ElementPosition) {
        if (!position) this.position = { x: RandomNum(100, (window.screen.availWidth - 100)), y: RandomNum(100, (window.screen.availHeight - 100)) }
        this.track = new RandomTrack()
    }
    setTrack(track: ITrack) {
        this.track = track
        return this
    }
    setElement(element: HTMLElement) {
        this.element = element
        return this
    }
    draw() {
        this.position = this.track.calculation(this.position)
        let cssText = ` 
        		left:${this.position.x}px;
        		top:${this.position.y}px;
        		position: fixed;
        	`
        this.element.style.cssText += cssText
    }
}
export class Lighting implements IAnimation {
    element: HTMLElement;
    constructor(private shadow?: number, private speed?: number, private color?: string) {
        if (!shadow) this.shadow = RandomNum(50, 150)
        if (!speed) this.speed = (RandomNum(-1, 1))
        if (!color) this.color = 'rgba(255,255,255,0.3)'
    }
    setElement(element: HTMLElement) {
        this.element = element
        return this
    }
    draw() {
        this.shadow = this.shadow + this.speed;
        if (this.shadow >= lightMax || this.shadow <= lightMin) {
            this.speed = -this.speed;
        }
        let cssText = `
			box-shadow:0px 0px ${this.shadow}px ${this.shadow}px ${this.color};
		`
        this.element.style.cssText += cssText
    }
}
export class TextShining implements IAnimation {
    element: HTMLElement;
    constructor(private light?: number, private speed?: number) {
        if (!light) this.light = 2
        if (!speed) this.speed = RandomNum(1, 3) / 15;
    }
    setElement(element: HTMLElement) {
        this.element = element
        return this
    }
    draw() {
        this.light = this.light + this.speed;
        if (this.light >= 8 || this.light <= 2) {
            this.speed = -this.speed
        }
        this.element.style.color = `rgba(255,255,255,${this.light / 10})`
    }
}

export class SizeChanging implements IAnimation {
    element: HTMLElement;
    constructor(private size?: number, private speed?: number) {
        if (!size) this.size = 20
        if (!speed) this.speed = RandomNum(0.05, 0.1);
    }
    setElement(element: HTMLElement) {
        this.element = element
        return this
    }
    draw() {
        this.size += this.speed
        if (this.size > 30 || this.size < 2) {
            this.speed = 0
        }
        let cssText = `
			 height:${this.size}px;
             width:${this.size}px;
		`
        this.element.style.cssText += cssText
    }
}

export class Rotating implements IAnimation {
    element: HTMLElement;
    constructor(private size?: number, private speed?: number) {
        if (!size) this.size = 0
        if (!speed) this.speed = RandomNum(-0.3, 0.5);
    }
    setElement(element: HTMLElement) {
        this.element = element
        return this
    }
    draw() {
        this.size += this.speed

        let cssText = `
        transform:rotate(${this.size}deg); 
        -ms-transform:rotate(${this.size}deg); 
        -moz-transform:rotate(${this.size}deg); 
        -webkit-transform:rotate(${this.size}deg); 
        -webkit-transform:rotate(${this.size}deg);  
		`
        this.element.style.cssText += cssText
    }
}
