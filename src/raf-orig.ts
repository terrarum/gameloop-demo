import { createLoop } from 'simple-gameloop';
import { createSquare, easyCanvas, renderRect, updateRect } from './utils';
import SPS from './sps';

const baseId = '#raf';

const playPauseButton = document.querySelector(`${baseId} .play`);
const resetButton = document.querySelector(`${baseId} .reset`);
const ppsEl = document.querySelector(`${baseId} .pps`);

const ups = new SPS(`${baseId} .ups`)
const fps = new SPS(`${baseId} .fps`)

const { element, context } = easyCanvas(baseId);

let square = createSquare();

const distance = 750;
let shouldUpdate = true;

playPauseButton?.addEventListener('click', () => {
    shouldUpdate = !shouldUpdate;
});

resetButton?.addEventListener('click', () => {
    square = createSquare();
});

function update(dt: number): void {
    ups.begin();

    updateRect(square, distance * dt, element);

    if (ppsEl) {
        ppsEl.innerHTML = distance.toString();
    }

    ups.end();
}

function render(): void {
    fps.begin();
    context.clearRect(0, 0, element.width, element.height);

    renderRect(square, context);

    fps.end();
}

export default function() {
    createLoop({
        update,
        render,
    });
}

