import { createSquare, easyCanvas, renderRect, updateRect } from './utils';
import SPS from './sps';

const baseId = '#fixedupdaterate';

const fpsSliderEl = document.querySelector(`${baseId} .js-fps input`);
const fpsValueEl = document.querySelector(`${baseId} .js-fps .value`);
const ppsEl = document.querySelector(`${baseId} .pps`);

let desiredFps = 30;
let desiredUps = 30;

function init() {
    if (fpsSliderEl === null || fpsValueEl === null) {
        throw new Error("Element missing.")
    }

    fpsSliderEl.addEventListener('change', (event) => {
        if (event.target instanceof HTMLInputElement) {
            desiredFps = parseInt(event.target.value);
        }
        fpsValueEl.innerHTML = desiredFps.toString();
    })
    fpsValueEl.innerHTML = desiredFps.toString();
}

export default function(): void {
    init();

    const ups = new SPS(`${baseId} .ups`);
    const fps = new SPS(`${baseId} .fps`);

    const { element, context } = easyCanvas(baseId);

    const square = createSquare();

    const distance = 30;

    function update(dt: number) {
        ups.begin();
        updateRect(square, distance * dt, element);
        ups.end();
        setTimeout(() => {
            update(1);
        }, 1000 / desiredUps);
    }

    function render() {
        fps.begin();
        context.clearRect(0, 0, element.width, element.height);
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