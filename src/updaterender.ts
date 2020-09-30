import { createSquare, easyCanvas, renderRect, updateRect } from './utils';
import { Rect } from './interfaces';

const baseId = '#updaterender';

const squareStat = document.querySelector(`${baseId} .square`);
const updateButton = document.querySelector(`${baseId} .update`);
const renderButton = document.querySelector(`${baseId} .render`);

function printSquare(square: Rect): void {
    if (squareStat != null) {
        squareStat.innerHTML = JSON.stringify(square, null, 2);
    }
}

export default function(): void {
    const { element, context } = easyCanvas(baseId);

    const square = createSquare();

    const distance = 10;

    updateButton?.addEventListener('click', () => {
        updateRect(square, distance, element);
        printSquare(square);
    });

    renderButton?.addEventListener('click', () => {
        context.clearRect(0, 0, element.width, element.height);

        renderRect(square, context);
    });

    renderRect(square, context);
    printSquare(square);
}