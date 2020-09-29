// Logic taken from https://github.com/mrdoob/stats.js/
export default class {
    private frames: number = 0;
    private beginTime: number = performance.now();
    private prevTime: number = this.beginTime;
    private element: Element;

    constructor(selector: string) {
        const element = document.querySelector(selector);
        if (element == null) {
            throw new Error(`Element ${selector} does not exist.`);
        }

        this.element = element;
    }

    begin() {
        this.beginTime = performance.now();
    }

    end() {
        this.frames++;
        const time = performance.now();
        if (time >= this.prevTime + 1000) {
            const value = Math.round((this.frames * 1000) / (time - this.prevTime));
            this.element.innerHTML = value.toString();

            this.prevTime = time;
            this.frames = 0;
        }
    }
}
