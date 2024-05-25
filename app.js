document.addEventListener('DOMContentLoaded', () => {
    const redButton = document.getElementById('redButton');
    const yellowButton = document.getElementById('yellowButton');
    const greenButton = document.getElementById('greenButton');
    const car = document.querySelector('.car');
    const tyres = document.querySelectorAll('.tair img');

    let currentPos = 0;
    let isPaused = false;

    const getCurrentPosition = () => {
        const computedStyle = getComputedStyle(car);
        const matrix = new DOMMatrixReadOnly(computedStyle.transform);
        return matrix.m41; // The current X position
    };

    const pauseAnimations = () => {
        car.classList.add('paused');
        tyres.forEach(tyre => tyre.style.animationPlayState = 'paused');
    };

    const resumeAnimations = () => {
        car.classList.remove('paused');
        tyres.forEach(tyre => tyre.style.animationPlayState = 'running');
    };

    redButton.addEventListener('click', pauseAnimations);

    yellowButton.addEventListener('click', () => {
        if (!isPaused) {
            currentPos = getCurrentPosition();
            car.style.transform = `translateX(${currentPos}px)`;
            car.classList.add('slow-stop');
            setTimeout(() => {
                pauseAnimations();
                car.classList.remove('slow-stop');
                car.style.transform = `translateX(${currentPos}px) rotate(-10deg)`; // Fixed syntax error here
                isPaused = true;
            }, 500); // Match the duration of slowStop transition
        }
    });

    greenButton.addEventListener('click', () => {
        if (isPaused) {
            car.style.transform = `translateX(${currentPos}px)`;
            resumeAnimations();
            isPaused = false;
        }
    });
});
