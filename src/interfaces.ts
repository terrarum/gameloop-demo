export interface Shape {
    x: number,
    y: number,
    color: string
}

export interface Rect extends Shape {
    width: number,
    height: number
}