interface IAnimation {
    element: HTMLElement;
    setElement(element: HTMLElement): IAnimation;
    draw(): void;
}
interface ElementPosition {
    x: number;
    y: number;
}
interface PositionSpeed {
    x: number;
    y: number;
}
export declare class Transformation {
    animations: IAnimation[];
    element: HTMLElement;
    constructor(container?: HTMLElement);
    setIAnimation(animation: IAnimation): this;
    appendChild(child: HTMLElement | string): this;
    draw(): void;
}
export declare class Moving implements IAnimation {
    private position?;
    private speed?;
    element: HTMLElement;
    constructor(position?: ElementPosition, speed?: PositionSpeed);
    setElement(element: HTMLElement): this;
    draw(): void;
}
export declare class Lighting implements IAnimation {
    private shadow?;
    private speed?;
    private color?;
    element: HTMLElement;
    constructor(shadow?: number, speed?: number, color?: string);
    setElement(element: HTMLElement): this;
    draw(): void;
}
export declare class TextShining implements IAnimation {
    private light?;
    private speed?;
    element: HTMLElement;
    constructor(light?: number, speed?: number);
    setElement(element: HTMLElement): this;
    draw(): void;
}
export {};
