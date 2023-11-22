import Board from './src/Board.js';

document.addEventListener('DOMContentLoaded', () => {
    const board = new Board();
    const scoreElement = document.getElementById('score-value');
    const resetButton = document.getElementById('reset');
    let score = 0;

    // Initialize the game
    function init() {
        board.addInitialTiles();
        renderBoard();
    }

    // Render the board
    function renderBoard() {
        const gameElement = document.getElementById('board');
        gameElement.innerHTML = ''; // Clear the board
        board.board.forEach(row => {
            const rowElement = document.createElement('div');
            rowElement.classList.add('grid_row');
            gameElement.appendChild(rowElement);
            row.forEach(tile => {
                const tileElement = document.createElement('div');
                tileElement.classList.add('grid_cell');
                tileElement.textContent = tile !== 0 ? tile : '';
                rowElement.appendChild(tileElement);
            });
        });
    }

    // Update the score
    function updateScore(value) {
        score += value;
        scoreElement.textContent = score;
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
                break;
        }

        if (moved) {
            board.addRandomTile();
            // updateScore(... calculate score based on board state ...);
            renderBoard();
            checkGameOver();
        }
    });

    // Check if the game is over
    function checkGameOver() {
        if (board.checkGameOver()) {
            alert('Game Over!');
        } else if (board.hasWon()) {
            alert('Congratulations, You Won!');
        }
    }

    // Reset game
    resetButton.addEventListener('click', () => {
        board.board = board.createBoard();
        score = 0;
        updateScore(0);
        init();
    });

    init(); // Start the game
});
