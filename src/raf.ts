import { createCanvas, createLoop, canvasOptions } from 'simple-gameloop';
import { createSquare, renderRect } from './utils';
import SPS from './sps';

const ppsEl = document.querySelector('#raf .pps');
if (ppsEl === null) throw new Error("ppsEl missing from raf");

const ups = new SPS('#raf .ups')
const fps = new SPS('#raf .fps')

const canvasOptions: canvasOptions = {
    width: 800,
    height: 200,
    classes: 'canvas js-canvas',
    containerSelector: '#raf > .canvasContainer',
}

const { element, context } = createCanvas(canvasOptions);

const square = createSquare();

const distance = 100;

function update(dt: number): void {
    ups.begin();
    square.x += distance * dt;
    square.x = square.x > element.width ? 0 : square.x;

    ppsEl.innerHTML = distance.toString();
    ups.end();
}

function render(): void {
    fps.begin();
    context.clearRect(0, 0, element.width, element.height);

    context.beginPath();

    renderRect(square, context);

    context.closePath();

    fps.end();
}

export default function() {
    createLoop({
        update,
        render,
    });
}

