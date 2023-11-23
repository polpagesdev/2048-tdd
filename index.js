import Board from './src/Board.js';

document.addEventListener('DOMContentLoaded', () => {
    const board = new Board();
    const scoreElement = document.getElementById('score-value');
    const resetButton = document.getElementById('reset');
    const infoButton = document.getElementById('info');
    const overlay = document.getElementById('popup-overlay');
    const description = document.getElementById('description');
    let score = 0;

    // Initialize the game
    function init() {
        board.addInitialTiles();
        renderBoard();
    }

    // Render the board and tiles on the screen.
    function renderBoard() {
        const gameElement = document.getElementById('board');
        gameElement.innerHTML = ''; // Clear the board
        board.board.forEach(row => {
            const rowElement = document.createElement('div');
            rowElement.classList.add('grid_row');
            gameElement.appendChild(rowElement);
            row.forEach(value => {
                const tileElement = document.createElement('div');
                tileElement.classList.add('grid_cell');
                tileElement.textContent = value !== 0 ? value : '';
                // Set style based on value
                switch (value) {
                    case 2: tileElement.style.background = '#fbfced'; tileElement.style.color = 'black'; break;
                    case 4: tileElement.style.background = '#ecefc6'; tileElement.style.color = 'black'; break;
                    case 8: tileElement.style.background = '#ffb296'; tileElement.style.color = 'black'; break;
                    case 16: tileElement.style.background = '#ff7373'; tileElement.style.color = 'black'; break;
                    case 32: tileElement.style.background = '#f6546a'; tileElement.style.color = 'white'; break;
                    case 64: tileElement.style.background = '#8b0000'; tileElement.style.color = 'white'; break;
                    case 128: tileElement.style.background = '#794044'; tileElement.style.color = 'white'; tileElement.style.fontSize = '40px'; break;
                    case 256: tileElement.style.background = '#31698a'; tileElement.style.color = 'white'; tileElement.style.fontSize = '40px'; break;
                    case 512: tileElement.style.background = '#297A76'; tileElement.style.color = 'white'; tileElement.style.fontSize = '40px'; break;
                    case 1024: tileElement.style.background = '#2D8A68'; tileElement.style.color = 'white'; tileElement.style.fontSize = '30px'; break;
                    case 2048: tileElement.style.background = '#1C9F4E'; tileElement.style.color = 'white'; tileElement.style.fontSize = '30px'; break;
                    case 4096: tileElement.style.background = '#468499'; tileElement.style.color = 'white'; tileElement.style.fontSize = '30px'; break;
                    case 8192: tileElement.style.background = '#0E2F44'; tileElement.style.color = 'white'; tileElement.style.fontSize = '30px'; break;
                    default: break;
                }
                rowElement.appendChild(tileElement);
            });
        });
        updateScore(board.getScore()); // Update score after rendering board
    }


    // Event listener for key presses
    document.addEventListener('keydown', (event) => {
        let moved = false;
        switch (event.key) {
            case 'ArrowLeft':
                board.moveLeft();
                moved = true;
                break;
            case 'ArrowRight':
                board.moveRight();
                moved = true;
                break;
            case 'ArrowUp':
                board.moveUp();
                moved = true;
                break;
            case 'ArrowDown':
                board.moveDown();
                moved = true;
                break;
            default:
                moved = false;
                break;
        }

        if (moved) {
            board.addRandomTile();
            renderBoard();
            checkGameOver();
        }
    });

    // Check if the game is over
    function checkGameOver() {
        if (board.hasLost()) {
            alert('Game Over!');
            resetGame();
        } else if (board.hasWon()) {
            alert('Congratulations, You Won! Now, you can try to get further score!');
        }
    }

    // Update the score
    function updateScore(value) {
        score += value;
        scoreElement.textContent = score;
    }

    function resetGame() {
        board.board = board.createBoard();
        score = 0;
        updateScore(0);
        init();
    }

    // Reset game
    resetButton.addEventListener('click', () => {
        resetGame();
    });

    // Show description when info button is clicked
    infoButton.addEventListener('click', function () {
        description.style.display = 'block';
        overlay.style.display = 'block';
    });

    // Hide description when overlay is clicked
    overlay.addEventListener('click', function () {
        description.style.display = 'none';
        overlay.style.display = 'none';
    });

    init(); // Start the game
});
