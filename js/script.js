document.addEventListener('DOMContentLoaded', () => {
    console.log('Pagina caricata con successo!');

    const noButton = document.getElementById('no-button');

    noButton.addEventListener('mouseover', () => {
        const buttonRect = noButton.getBoundingClientRect();

        const maxX = window.innerWidth - buttonRect.width;
        const maxY = window.innerHeight - buttonRect.height;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        noButton.style.left = `${randomX}px`;
        noButton.style.top = `${randomY}px`;
    });
});
