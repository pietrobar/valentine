document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const card = document.getElementById('card');
    const noButton = document.getElementById('no-button');
    const yesButton = document.getElementById('yes-button');
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

    const createFloatingHearts = () => {
        const heartCount = 400;
        
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            
            // Posizione casuale su tutto lo schermo
            const randomX = Math.random() * window.innerWidth;
            const randomY = Math.random() * window.innerHeight;
            
            heart.style.position = 'fixed'; // importante!
            heart.style.left = `${randomX}px`;
            heart.style.top = `${randomY}px`; // usa SOLO top, non bottom
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }
    };

    yesButton.addEventListener('click', () => {
        createFloatingHearts();
        success();
    });

    const success = () => {
        hideCard();
    }

    const hideCard = () => {
        card.style.transition = 'opacity 1s';
        card.style.opacity = '0';
        setTimeout(() => {
            card.style.display = 'none';
        }, 1000);
        
    }

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
