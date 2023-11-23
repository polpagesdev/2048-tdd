export default class Board {
    constructor(size = 4) {
        this.size = size;
        this.board = this.createBoard();
        this.score = 0;
    }

    // Creates an empty 4x4 board.
    createBoard() {
        return Array.from({ length: this.size }, () => Array(this.size).fill(0));
    }

    // Adds two random tiles to the board.
    addInitialTiles() {
        this.addRandomTile();
        this.addRandomTile();
    }

    // Adds a new tile to the board in a random position.
    addRandomTile() {
        // Find all empty spots
        const emptySpots = [];
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                if (this.board[row][col] === 0) {
                    emptySpots.push({ row, col });
                }
            }
        }

        // Check if there are any empty spots
        if (emptySpots.length === 0) {
            return false; // No tile added since the board is full
        }

        // Select a random empty spot
        const randomIndex = Math.floor(Math.random() * emptySpots.length);
        const { row, col } = emptySpots[randomIndex];
        this.board[row][col] = Math.random() < 0.9 ? 2 : 4;

        return true; // Tile successfully added
    }

    // Moves tiles to the left and merges tiles when possible.
    moveLeft() {
        let scoreToAdd = 0;
        this.board = this.board.map(row => {
            let newRow = row.filter(val => val !== 0); // remove zeros
            for (let i = 0; i < newRow.length - 1; i++) { // combine tiles
                if (newRow[i] === newRow[i + 1]) {
                    scoreToAdd += newRow[i] * 2; // Add score
                    newRow[i] *= 2;
                    newRow[i + 1] = 0;
                }
            }
            newRow = newRow.filter(val => val !== 0); // remove new zeros
            while (newRow.length < this.size) { // add zeros to the end
                newRow.push(0);
            }
            return newRow;
        });
        this.score = scoreToAdd; // Update the score for this move
    }

    // Moves tiles to the right and merges tiles when possible.
    moveRight() {
        let scoreToAdd = 0;
        this.board = this.board.map(row => {
            let newRow = row.filter(val => val !== 0);
            for (let i = newRow.length - 1; i > 0; i--) {
                if (newRow[i] === newRow[i - 1]) {
                    scoreToAdd += newRow[i] * 2; // Add score
                    newRow[i] *= 2;
                    newRow[i - 1] = 0;
                }
            }
            newRow = newRow.filter(val => val !== 0);
            while (newRow.length < this.size) {
                newRow.unshift(0);
            }
            return newRow;
        });
        this.score = scoreToAdd; // Update the score for this move
    }

    // Moves tiles up and merges tiles when possible.
    moveUp() {
        this.transposeBoard();
        this.moveLeft();
        this.transposeBoard();
    }

    // Moves tiles down and merges tiles when possible.
    moveDown() {
        this.transposeBoard();
        this.moveRight();
        this.transposeBoard();
    }

    // Transposes the board to be able to move vertically or horizontally.
    transposeBoard() {
        this.board = this.board[0].map((_col, i) => this.board.map(row => row[i]));
    }

    // Checks if the player can move left or right.
    canMoveHorizontal() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size - 1; j++) {
                if (this.board[i][j] === this.board[i][j + 1]) return true;
            }
        }
        return false;
    }

    // Checks if the player can move up or down.
    canMoveVertical() {
        for (let j = 0; j < this.size; j++) {
            for (let i = 0; i < this.size - 1; i++) {
                if (this.board[i][j] === this.board[i + 1][j]) return true;
            }
        }
        return false;
    }

    getHighestTile() {
        return Math.max(...this.board.flat());
    }

    getScore() {
        return this.score;
    }

    // Checks if the game is over by checking if there are any empty cells and if there are no adjacent cells with the same value.
    hasLost() {
        if (!this.canMoveHorizontal() && !this.canMoveVertical()) {
            for (let i = 0; i < this.size; i++) {
                for (let j = 0; j < this.size; j++) {
                    if (this.board[i][j] === 0) return false;
                }
            }
            return true;
        }
        return false;
    }

    // Checks if the game is won by checking if there are any 2048 tiles.
    hasWon() {
        return this.board.some(row => row.includes(2048));
    }

    /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */
    /* –––––––––––––– Mocking methods for testing only –––––––––––––– */
    /* –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– */

    // The move method is intended to serve as a wrapper for the moveLeft, moveRight, moveUp, and moveDown methods.
    move(userInput) {
        let moved = false;
        switch (userInput) {
            case 'left':
                this.moveLeft();
                moved = true;
                break;
            case 'right':
                this.moveRight();
                moved = true;
                break;
            case 'up':
                this.moveUp();
                moved = true;
                break;
            case 'down':
                this.moveDown();
                moved = true;
                break;
            default:
                moved = false;
                break;
        }

        if (moved) {
            this.addRandomTile();
            // updateScore();
            this.checkGameOver();
        }
    }

    // Check if the game is over
    checkGameOver() {
        if (this.hasLost()) {
            console.log('Game Over!');
        } else if (this.hasWon()) {
            console.log('Congratulations, You Won!');
        }
    }

    // This method will simulate rendering by creating a string representation of the board
    render() {
        return this.board.map(row => row.join(' ')).join('\n');
    }
}