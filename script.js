document.addEventListener('DOMContentLoaded', (event) => {
    const character = document.getElementById('character');
    const gameArea = document.getElementById('gameArea');
    const items = document.querySelectorAll('.item');
    const obstacles = document.querySelectorAll('.obstacle');
    const scoreDisplay = document.getElementById('score');
    const step = 10;
    let posX = character.offsetLeft;
    let posY = character.offsetTop;
    let score = 0;

    // Set initial positions of items and obstacles
    const positions = {
        item1: {x: 100, y: 100},
        item2: {x: 600, y: 400},
        item3: {x: 200, y: 300},
        item4: {x: 700, y: 100},
        item5: {x: 300, y: 100},
        item6: {x: 400, y: 200},
        item7: {x: 500, y: 300},
        item8: {x: 600, y: 100},
        item9: {x: 200, y: 500},
        item10: {x: 100, y: 300},
        obstacle1: {x: 300, y: 200, directionX: 1, directionY: 1},
        obstacle2: {x: 500, y: 300, directionX: -1, directionY: 1},
        obstacle3: {x: 100, y: 500, directionX: 1, directionY: -1},
        obstacle4: {x: 600, y: 100, directionX: -1, directionY: -1}
    };

    for (const id in positions) {
        const element = document.getElementById(id);
        element.style.left = positions[id].x + 'px';
        element.style.top = positions[id].y + 'px';
    }

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                if (posY - step >= 0) posY -= step;
                break;
            case 'ArrowDown':
                if (posY + step <= gameArea.clientHeight - character.clientHeight) posY += step;
                break;
            case 'ArrowLeft':
                if (posX - step >= 0) posX -= step;
                break;
            case 'ArrowRight':
                if (posX + step <= gameArea.clientWidth - character.clientWidth) posX += step;
                break;
        }
        character.style.top = posY + 'px';
        character.style.left = posX + 'px';

        checkCollision();
    });

    function checkCollision() {
        items.forEach(item => {
            if (isColliding(character, item)) {
                item.style.display = 'none';
                score += 20;
                updateScore();
                if (score >= 200) {
                    alert('You Win!');
                    resetGame();
                }
            }
        });

        obstacles.forEach(obstacle => {
            if (isColliding(character, obstacle)) {
                alert('Game Over!');
                resetGame();
            }
        });
    }

    function isColliding(a, b) {
        const aRect = a.getBoundingClientRect();
        const bRect = b.getBoundingClientRect();
        return !(
            aRect.top > bRect.bottom ||
            aRect.bottom < bRect.top ||
            aRect.left > bRect.right ||
            aRect.right < bRect.left
        );
    }

    function updateScore() {
        scoreDisplay.textContent = 'Score: ' + score;
    }

    function resetGame() {
        posX = 375;
        posY = 275;
        character.style.left = posX + 'px';
        character.style.top = posY + 'px';
        items.forEach(item => item.style.display = 'block');
        score = 0;
        updateScore();
    }

    function moveObstacles() {
        obstacles.forEach(obstacle => {
            const pos = positions[obstacle.id];
            pos.x += pos.directionX * step;
            pos.y += pos.directionY * step;

            if (pos.x <= 0 || pos.x >= gameArea.clientWidth - obstacle.clientWidth) {
                pos.directionX *= -1;
            }
            if (pos.y <= 0 || pos.y >= gameArea.clientHeight - obstacle.clientHeight) {
                pos.directionY *= -1;
            }

            obstacle.style.left = pos.x + 'px';
            obstacle.style.top = pos.y + 'px';
        });
    }

    setInterval(moveObstacles, 100);
});