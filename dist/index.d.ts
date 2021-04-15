interface IAnimation {
    element: HTMLElement;
    setElement(element: HTMLElement): IAnimation;
    draw(): void;
}
interface ITrack {
    calculation(position: ElementPosition): ElementPosition;
}
interface IMoving {
    track: ITrack;
    setTrack(track: ITrack): any;
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
    cssText: string;
    constructor(container?: HTMLElement);
    initCssText(cssText: any): void;
    setAnimation(animation: IAnimation): this;
    appendChild(child: HTMLElement | string): this;
    draw(): void;
}
export declare class RandomTrack implements ITrack {
    private speed?;
    constructor(speed?: PositionSpeed);
    calculation(position: ElementPosition): ElementPosition;
}
export declare class UpTrack implements ITrack {
    private speed?;
    constructor(speed?: PositionSpeed);
    calculation(position: ElementPosition): ElementPosition;
}
export declare class DownTrack implements ITrack {
    private speed?;
    constructor(speed?: PositionSpeed);
    calculation(position: ElementPosition): ElementPosition;
}
export declare class SpreadTrack implements ITrack {
    private speed?;
    constructor(speed?: PositionSpeed);
    calculation(position: ElementPosition): ElementPosition;
}
export declare class Moving implements IAnimation, IMoving {
    private position?;
    track: ITrack;
    element: HTMLElement;
    constructor(position?: ElementPosition);
    setTrack(track: ITrack): void;
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
