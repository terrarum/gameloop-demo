import { createCanvas, canvasOptions } from 'simple-gameloop';
import { createSquare, renderRect } from './utils';
import SPS from './sps';

const speedSliderEl = document.querySelector('#nonraf .js-speed input');
const speedValueEl = document.querySelector('#nonraf .js-speed .value');
const ppsEl = document.querySelector('#nonraf .pps');

if (ppsEl === null) throw new Error("ppsEl missing from nonraf");

const ups = new SPS('#nonraf .ups')
const fps = new SPS('#nonraf .fps')

const canvasOptions: canvasOptions = {
    width: 800,
    height: 200,
    classes: 'canvas js-canvas',
    containerSelector: '#nonraf > .canvasContainer',
}

let duration = 100;

if (speedSliderEl === null || speedValueEl === null) {
    throw new Error("Element missing.")
}

speedValueEl.innerHTML = duration.toString();

speedSliderEl.addEventListener('change', (event) => {
    if (event.target instanceof HTMLInputElement) {
        duration = parseInt(event.target.value);
    }
    speedValueEl.innerHTML = duration.toString();
})

export default function(): void {
    const { element, context } = createCanvas(canvasOptions);

    const square = createSquare();

    const distance = 15;

    function step() {
        ups.begin();
        fps.begin();
        context.clearRect(0, 0, element.width, element.height);

        context.beginPath();
        context.fillStyle = square.color;

        square.x += distance;
        square.x = square.x > element.width ? 0 : square.x;

        renderRect(square, context);

        ppsEl.innerHTML = (Math.round(distance * (1000 / duration))).toString();

        context.closePath();

        ups.end();
        fps.end();
        setTimeout(step, duration);
    }

    step();
}