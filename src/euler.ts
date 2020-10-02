import { createSquare, easyCanvas, renderRect, updateRect } from './utils';
import SPS from './sps';

const baseId = '#euler';

const dtContainer = document.querySelector(`${baseId} .dtContainer`);
const dtEl = document.querySelector(`${baseId} .dt`);
const fpsSliderEl = document.querySelector(`${baseId} .js-fps input`);
const fpsValueEl = document.querySelector(`${baseId} .js-fps .value`);
const upsSliderEl = document.querySelector(`${baseId} .js-ups input`);
const upsValueEl = document.querySelector(`${baseId} .js-ups .value`);
const distSliderEl = document.querySelector(`${baseId} .js-dist input`);
const distValueEl = document.querySelector(`${baseId} .js-dist .value`);
const distGroupEl = document.querySelector(`${baseId} .js-dist`);
const dist2SliderEl = document.querySelector(`${baseId} .js-dist2 input`);
const dist2ValueEl = document.querySelector(`${baseId} .js-dist2 .value`);
const dist2GroupEl = document.querySelector(`${baseId} .js-dist2`);
const resetButton = document.querySelector(`${baseId} .euler-reset`);
const smoothButton = document.querySelector(`${baseId} .euler-smooth`);
const euleriseCheckbox = document.querySelector(`${baseId} .eulerise`);
const ppsEl = document.querySelector(`${baseId} .pps`);

let desiredFps = 30;
let desiredUps = 30;
let desiredPps = 900;
let distance = 30;
let eulerise = false;

function init() {
    if (!fpsSliderEl || !fpsValueEl ||
        !upsSliderEl || !upsValueEl ||
        !distSliderEl || !distValueEl ||
        !smoothButton || !resetButton ||
        !euleriseCheckbox || !distGroupEl ||
        !dist2SliderEl || !dist2ValueEl ||
        !dist2GroupEl || !dtEl || !dtContainer) {
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

    distSliderEl.addEventListener('change', (event) => {
        if (event.target instanceof HTMLInputElement) {
            distance = parseInt(event.target.value);
        }
        distValueEl.innerHTML = distance.toString();
    })
    distValueEl.innerHTML = distance.toString();

    dist2SliderEl.addEventListener('change', (event) => {
        if (event.target instanceof HTMLInputElement) {
            desiredPps = parseInt(event.target.value);
        }
        dist2ValueEl.innerHTML = desiredPps.toString();
    })
    dist2ValueEl.innerHTML = desiredPps.toString();

    resetButton.addEventListener('click', () => {
        desiredFps = 30;
        desiredUps = 30;
        distance = 30;
        if (fpsSliderEl instanceof HTMLInputElement) {
            fpsSliderEl.value = desiredFps.toString();
        }
        if (upsSliderEl instanceof HTMLInputElement) {
            upsSliderEl.value = desiredUps.toString();
        }
        if (distSliderEl instanceof HTMLInputElement) {
            distSliderEl.value = distance.toString();
        }
        fpsValueEl.innerHTML = desiredFps.toString();
        upsValueEl.innerHTML = desiredUps.toString();
        distValueEl.innerHTML = distance.toString();
    });

    smoothButton.addEventListener('click', () => {
        desiredFps = 60;
        desiredUps = 60;
        distance = 15;
        if (fpsSliderEl instanceof HTMLInputElement) {
            fpsSliderEl.value = desiredFps.toString();
        }
        if (upsSliderEl instanceof HTMLInputElement) {
            upsSliderEl.value = desiredUps.toString();
        }
        if (distSliderEl instanceof HTMLInputElement) {
            distSliderEl.value = distance.toString();
        }
        fpsValueEl.innerHTML = desiredFps.toString();
        upsValueEl.innerHTML = desiredUps.toString();
        distValueEl.innerHTML = distance.toString();
    });

    euleriseCheckbox.addEventListener('change', (event) => {
        if (event.target instanceof HTMLInputElement) {
            eulerise = event.target.checked;
            if (eulerise) {
                distGroupEl.classList.add('disabled');
                dist2GroupEl.classList.remove('hidden');
                dtContainer.classList.remove('hidden');
            }
            else {
                distGroupEl.classList.remove('disabled');
                dist2GroupEl.classList.add('hidden');
                dtContainer.classList.add('hidden');
            }
        }
    });
}

let eulerPpsDisplay = 0;

export default function(): void {
    init();

    const ups = new SPS(`${baseId} .ups`);
    const fps = new SPS(`${baseId} .fps`);

    const { element, context } = easyCanvas(baseId);

    const square = createSquare();

    let last = performance.now();
    let now = last;
    function update() {
        now = performance.now();
        const deltaTime = now - last;
        ups.begin();
        if (eulerise) {
            if (dtEl instanceof HTMLElement) {
                dtEl.innerText = `${deltaTime.toFixed(2)}ms`;
            }
            const stepDistance = desiredPps * (deltaTime / 1000);
            updateRect(square, stepDistance, element);
            if (distSliderEl instanceof HTMLInputElement) {
                distSliderEl.value = stepDistance.toString();
            }
            if (distValueEl instanceof HTMLElement) {
                distValueEl.innerHTML = stepDistance.toFixed(2).toString();
            }
            eulerPpsDisplay = stepDistance * desiredUps;
        }
        else {
            updateRect(square, distance, element);
        }
        last = now;
        ups.end();

        setTimeout(update, 1000 / desiredUps);
    }

    function render() {
        fps.begin();
        context.fillStyle = 'gold';
        context.fillRect(0, 0, element.width, element.height);

        renderRect(square, context);

        if (ppsEl) {
            if (eulerise) {
                ppsEl.innerHTML = (eulerPpsDisplay).toFixed(2).toString();
            }
            else {
                ppsEl.innerHTML = (distance * desiredUps).toString();
            }
        }

        fps.end();
        setTimeout(render, 1000 / desiredFps);
    }
    update();
    render();
}