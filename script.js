document.addEventListener('DOMContentLoaded', function () {
    const menu = document.getElementById('menu');
    const gameContainer = document.getElementById('game-container');
    const gameOverScreen = document.getElementById('game-over');
    const finalScoreElement = document.getElementById('final-score');
    const scoreElement = document.getElementById('score');
    const timeElement = document.getElementById('time');
    const startButtons = document.querySelectorAll('.start-button');
    const playAgainButton = document.getElementById('restart-button');

    let score = 0;
    let timeLeft = 30;
    let gameInterval;
    let spawnInterval;
    const maxTargets = 5;

    const spawnIntervalByLevel = {
        1: 500,  // Beginner
        2: 400,  // lvl 2
        3: 300,  // lvl 3
        4: 200,  // lvl 4
        5: 100   // lvl 5
    };

    function startGame(event) {
        const level = event.target.dataset.level;
        console.log('Starting game...');
        console.log('Selected difficulty level:', level);

        score = 0;
        timeLeft = 30;
        scoreElement.textContent = score;
        timeElement.textContent = `${timeLeft}s`;

        menu.classList.add('hidden');
        gameOverScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');

        gameInterval = setInterval(() => {
            timeLeft--;
            timeElement.textContent = `${timeLeft}s`;

            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);

        spawnTargets(level);
    }

    function endGame() {
        clearInterval(gameInterval);
        clearInterval(spawnInterval);
        document.querySelectorAll('.target').forEach(target => target.remove());
        finalScoreElement.textContent = score;
        gameContainer.classList.add('hidden');
        gameOverScreen.classList.remove('hidden');
    }

    function createTarget() {
        const target = document.createElement('div');
        target.classList.add('target');
        gameContainer.appendChild(target);

        target.addEventListener('click', () => {
            incrementScore();
            target.style.display = 'none';
        });

        return target;
    }

    function moveTarget(target) {
        const containerWidth = gameContainer.clientWidth;
        const containerHeight = gameContainer.clientHeight;
        const targetSize = 40;

        // Ensure the target stays within the bounds of the container
        const x = Math.random() * (containerWidth - targetSize);
        const y = Math.random() * (containerHeight - targetSize);

        target.style.left = `${x}px`;
        target.style.top = `${y}px`;
        target.style.display = 'block';

        // Set a random duration for how long the target will stay visible
        const displayDuration = Math.random() * (3000 - 1000) + 1000; // Between 1 and 3 seconds

        // Hide target after the random display duration
        setTimeout(() => {
            target.style.display = 'none';
        }, displayDuration);
    }

    function spawnTargets(level) {
        const spawnTime = spawnIntervalByLevel[level];

        spawnInterval = setInterval(() => {
            if (document.querySelectorAll('.target:not([style*="display: none"])').length >= maxTargets) {
                return;
            }

            const target = createTarget();
            moveTarget(target);
        }, spawnTime);
    }

    function incrementScore() {
        score++;
        scoreElement.textContent = score;
    }

    startButtons.forEach(button => {
        button.addEventListener('click', startGame);
    });

    playAgainButton.addEventListener('click', () => {
        gameOverScreen.classList.add('hidden');
        menu.classList.remove('hidden');
    });
});

const texts = [
    'Yabai', 
    'Kawaii',
    'Sugoi',
    'Otsukaresama',
    'Kakkoii',
    'Genki',
    'Chotto',
    'Yosh',
    'Nani',
    'Mochiron',
    'Daijoubu',
    'Zettai',
    'Hontou',
    'Kekkou',
    'Oishii',
    'Suki',
    'Arigatou'
];

document.body.addEventListener('click', function(event) {
    createText(event);
});

function getRandomText() {
    return texts[Math.floor(Math.random() * texts.length)];
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function createText(event) {
    const text = document.createElement('div');
    const randomColor = getRandomColor();
    text.className = 'floating-text';
    text.innerText = getRandomText();
    text.style.left = event.clientX + 'px';
    text.style.top = event.clientY + 'px';
    text.style.color = randomColor;
    document.body.appendChild(text);
    setTimeout(() => {
        text.remove();
    }, 500);
}

document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('background-audio');
  const controlButton = document.getElementById('audio-control');

  function toggleAudio() {
    if (audio.paused) {
      audio.play().catch(error => {
        console.error('Audio playback was prevented:', error);
      });
      controlButton.textContent = 'Stop Music'; // Change button text to 'Stop'
    } else {
      audio.pause();
      controlButton.textContent = 'Play Music'; // Change button text to 'Play'
    }
  }
  // Event listener for the button
  controlButton.addEventListener('click', toggleAudio);
});

