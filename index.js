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

    init(); // Start the game
});
