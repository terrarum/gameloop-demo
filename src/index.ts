import './styles.css';

import nonraf from './nonraf';

nonraf();

import { createCanvas, createLoop, canvasOptions } from 'simple-gameloop';
import { Rect } from './interfaces';

const canvasOptions: canvasOptions = {
    width: 800,
    height: 200,
    classes: 'canvas js-canvas',
    containerSelector: '.canvasContainer',
}

const { element, context } = createCanvas(canvasOptions);

const square: Rect = {
    x: 100,
    y: 50,
    width: 100,
    height: 100,
    color: '#000000',
}

function update(dt: number): void {
    square.x += 50 * dt;
    square.x = square.x > element.width ? 0 : square.x;
}

function drawRect(rect: Rect): void {
    context.fillRect(rect.x, rect.y, rect.width, rect.height);
}

function createOffsetRect(rect: Rect): Rect {
    const offsetRect = Object.assign({}, rect);
    offsetRect.x -= element.width;
    return offsetRect;
}

function render(): void {
    context.clearRect(0, 0, element.width, element.height);

    context.beginPath();
    context.fillStyle = square.color;

    drawRect(square);

    if (square.x > element.width - square.width) {
        drawRect(createOffsetRect(square));
    }

    context.closePath();
}

createLoop({
    update,
    render,
})
