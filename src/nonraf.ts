import { createCanvas, createLoop, canvasOptions } from 'simple-gameloop';
import { Rect } from './interfaces';

const canvasOptions: canvasOptions = {
    width: 800,
    height: 200,
    classes: 'canvas js-canvas',
    containerSelector: '.canvasContainer',
}

let limit = 100;
let count = 0;
export default function(): void {
    const { element, context } = createCanvas(canvasOptions);

    const square: Rect = {
        x: 100,
        y: 50,
        width: 100,
        height: 100,
        color: '#000000',
    }

    const duration = 100;

    function render() {
        context.clearRect(0, 0, element.width, element.height);

        context.beginPath();
        context.fillStyle = square.color;

        square.x += 10;
        square.x = square.x > element.width ? 0 : square.x;
        context.fillRect(square.x, square.y, square.width, square.height);
        context.closePath();
        setTimeout(render, duration);
    }

    render();
}