export default function () {
    const urlParams = new URLSearchParams(window.location.search);
    const dev = urlParams.get('dev');

    const one = document.querySelector('.slide.one');
    const buttons = document.querySelectorAll('.contents button');
    const slides = document.querySelectorAll('.slide');

    if (dev === null) {
        slides.forEach((slide) => {
            slide.classList.add('hidden');
        });
        one?.classList.remove('hidden');
    }

    buttons.forEach((button) => {
        const id = button.id;
        button.addEventListener('click', () => {
            if (id === 'all') {
                slides.forEach((slide) => {
                    slide.classList.remove('hidden');
                });
            }
            else {
                slides.forEach((slide) => {
                    slide.classList.add('hidden');
                });
                const currentSlide = document.querySelector(`.slide.${id}`);
                currentSlide?.classList.remove('hidden');
            }
        });
    })
}