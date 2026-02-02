document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const card = document.getElementById('card');
    const noButton = document.getElementById('no-button');
    let attemptCount = 0;

    const barkSound = new Audio('sounds/growl.mp3');
    let audioUnlocked = false;

    // Apertura busta
    envelope.addEventListener('click', () => {
        envelope.style.display = 'none';
        card.style.display = 'block';
        
        // Sblocco audio
        barkSound.play()
            .then(() => {
                barkSound.pause();
                barkSound.currentTime = 0;
                audioUnlocked = true;
            })
            .catch(() => {});
    });

    const getRandomPosition = (element) => {
        const rect = element.getBoundingClientRect();
        return {
            x: Math.random() * (window.innerWidth - rect.width),
            y: Math.random() * (window.innerHeight - rect.height)
        };
    };

    noButton.addEventListener('mouseenter', function () {
        attemptCount++;

        if (attemptCount >= 3) {
            if (!audioUnlocked) return;

            barkSound.currentTime = 0;
            barkSound.play();

            const img = document.createElement('img');
            img.src = 'images/ollieminu.png';
            img.style.position = 'fixed';
            img.style.left = '-200px';
            img.style.top = '50%';
            img.style.transform = 'translateY(-50%)';
            img.style.zIndex = '1000';
            document.body.appendChild(img);

            noButton.style.display = 'none';

            barkSound.onended = () => {
                img.remove();
                noButton.style.display = '';
            };

            attemptCount = 0;
            return;
        }

        const pos = getRandomPosition(this);
        this.style.left = `${pos.x}px`;
        this.style.top = `${pos.y}px`;
    });
});
