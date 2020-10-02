import { Rect } from './interfaces';
import { canvasObject, canvasOptions, createCanvas } from 'simple-gameloop';

export function updateRect(rect: Rect, distance: number, element: HTMLCanvasElement) {
    rect.x += distance;
    rect.x = rect.x > element.width ? rect.x - element.width : rect.x;
}

export function renderRect(rect: Rect, context: CanvasRenderingContext2D) {
    const canvas = context.canvas;
    context.fillStyle = rect.color;
    context.fillRect(rect.x, rect.y, rect.width, rect.height);

    if (rect.x > canvas.width - rect.width) {
        context.fillRect(rect.x - canvas.width, rect.y, rect.width, rect.height);
    }
}

export function createSquare(): Rect {
    return {
        x: 400,
        y: 50,
        width: 100,
        height: 100,
        color: '#000000',
    }
}

export function easyCanvas(baseId: string): canvasObject {
    const canvasOptions: canvasOptions = {
        width: 900,
        height: 200,
        classes: 'canvas js-canvas',
        containerSelector: `${baseId} > .canvasContainer`,
    }

    return createCanvas(canvasOptions);
}
