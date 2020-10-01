import { createLoop } from 'simple-gameloop';
import { createSquare, easyCanvas, renderRect, updateRect } from './utils';

const baseId = '#intro';

const { element, context } = easyCanvas(baseId);

let square = createSquare();

const distance = 100;

function update(dt: number): void {
    updateRect(square, distance * dt, element);
}

function render(): void {
    context.clearRect(0, 0, element.width, element.height);
    renderRect(square, context);
}

export default function() {
    createLoop({
        update,
        render,
    });
}

