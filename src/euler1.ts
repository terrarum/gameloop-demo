import { createSquare, easyCanvas, renderRect, updateRect } from './utils';
import SPS from './sps';

const baseId = '#euler1';

const fpsSliderEl = document.querySelector(`${baseId} .js-fps input`);
const fpsValueEl = document.querySelector(`${baseId} .js-fps .value`);
const upsSliderEl = document.querySelector(`${baseId} .js-ups input`);
const upsValueEl = document.querySelector(`${baseId} .js-ups .value`);
const ppsEl = document.querySelector(`${baseId} .pps`);

let duration = 100;

let desiredFps = 30;
let desiredUps = 30;

function init() {
    if (fpsSliderEl === null || fpsValueEl === null || upsSliderEl === null || upsValueEl === null) {
        throw new Error("Element missing.")
    }

    fpsSliderEl.innerHTML = duration.toString();
    fpsSliderEl.addEventListener('change', (event) => {
        if (event.target instanceof HTMLInputElement) {
            desiredFps = parseInt(event.target.value);
        }
        fpsValueEl.innerHTML = desiredFps.toString();
    })
    fpsValueEl.innerHTML = desiredFps.toString();

    upsSliderEl.innerHTML = duration.toString();
    upsSliderEl.addEventListener('change', (event) => {
        if (event.target instanceof HTMLInputElement) {
            desiredUps = parseInt(event.target.value);
        }
        upsValueEl.innerHTML = desiredUps.toString();
    })
    upsValueEl.innerHTML = desiredUps.toString();
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