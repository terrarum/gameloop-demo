export default function () {
    const buttons = document.querySelectorAll('.contents button');
    const slides = document.querySelectorAll('.slide');

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