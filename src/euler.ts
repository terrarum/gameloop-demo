import { createSquare, easyCanvas, renderRect, updateRect } from './utils';
import SPS from './sps';

const baseId = '#euler';

const fpsSliderEl = document.querySelector(`${baseId} .js-fps input`);
const fpsValueEl = document.querySelector(`${baseId} .js-fps .value`);
const upsSliderEl = document.querySelector(`${baseId} .js-ups input`);
const upsValueEl = document.querySelector(`${baseId} .js-ups .value`);
const ppsEl = document.querySelector(`${baseId} .pps`);

let desiredFps = 30;
let desiredUps = 30;

function init() {
    if (fpsSliderEl === null || fpsValueEl === null || upsSliderEl === null || upsValueEl === null) {
        throw new Error("Element missing.")
    }

    fpsSliderEl.addEventListener('change', (event) => {
        if (event.target instanceof HTMLInputElement) {
            desiredFps = parseInt(event.target.value);
        }
        fpsValueEl.innerHTML = desiredFps.toString();
    })
    fpsValueEl.innerHTML = desiredFps.toString();

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

    const distance = 30;

    function update() {
        ups.begin();
        updateRect(square, distance, element);
        ups.end();
        setTimeout(update, 1000 / desiredUps);
    }

    function render() {
        fps.begin();
        context.fillStyle = 'gold';
        context.fillRect(0, 0, element.width, element.height);

        renderRect(square, context);

        if (ppsEl) {
            ppsEl.innerHTML = (distance * desiredUps).toString();
        }

        fps.end();
        setTimeout(render, 1000 / desiredFps);
    }
    update(1);
    render();
}