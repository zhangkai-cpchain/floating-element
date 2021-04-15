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
const RandomNum = (num1: number, num2: number): number => {
    return Math.floor(Math.random() * (num2 - num1 + 1) + num1);
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
        if (!speed) this.speed = { x: RandomNum(1, 3) - 2, y: RandomNum(1, 3) - 2 }
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
        if (!speed) this.speed = { x: RandomNum(0.1, 0.3) - 0.2, y: RandomNum(1, 3) - 3 }
    }
    calculation(position: ElementPosition): ElementPosition {
        position.x += this.speed.x
        position.y += this.speed.y
        if (position.x >= window.screen.availWidth || position.x <= 0) {
            this.speed.x = -this.speed.x;// 
        }
        if (position.y <= 0) {
            position.y += window.screen.availHeight
        }
        return position
    }
}

export class DownTrack implements ITrack {
    constructor(private speed?: PositionSpeed) {
        if (!speed) this.speed = { x: RandomNum(0.1, 0.3) - 0.2, y: RandomNum(1, 3) }
    }
    calculation(position: ElementPosition): ElementPosition {
        position.x += this.speed.x
        position.y += this.speed.y
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
        if (!speed) this.speed = { x: RandomNum(1, 3) - 2, y: RandomNum(1, 3) - 2 }
    }
    calculation(position: ElementPosition): ElementPosition {
        position.x += this.speed.x
        position.y += this.speed.y
        if (position.x >= window.screen.availWidth || position.x <= 0 || position.y >= window.screen.availHeight || position.y <= 0) {
            position.x = window.screen.availWidth / 2
            position.y = window.screen.availHeight / 2
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
        if (!speed) this.speed = (RandomNum(1, 3) - 2)
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