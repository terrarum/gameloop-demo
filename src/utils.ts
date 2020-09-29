import { Rect } from './interfaces';

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
        x: 100,
        y: 50,
        width: 100,
        height: 100,
        color: '#000000',
    }
}
