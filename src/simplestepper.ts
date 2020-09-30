import { createSquare, easyCanvas, renderRect, updateRect } from './utils';
import SPS from './sps';

const baseId = '#simplestepper';

const speedSliderEl = document.querySelector(`${baseId} .js-speed input`);
const speedValueEl = document.querySelector(`${baseId} .js-speed .value`);
const ppsEl = document.querySelector(`${baseId} .pps`);

let duration = 100;

function init() {
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
}

export default function(): void {
    init();

    const ups = new SPS(`${baseId} .ups`);
    const fps = new SPS(`${baseId} .fps`);

    const { element, context } = easyCanvas(baseId);

    const square = createSquare();

    const distance = 15;

    function step() {
        ups.begin();
        fps.begin();
        context.clearRect(0, 0, element.width, element.height);

        updateRect(square, distance, element);
        renderRect(square, context);

        if (ppsEl) {
            ppsEl.innerHTML = (Math.round(distance * (1000 / duration))).toString();
        }

        ups.end();
        fps.end();
        setTimeout(step, duration);
    }

    step();
}