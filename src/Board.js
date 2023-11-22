export default class Board {
    constructor(size = 4) {
        this.size = size;
        this.board = this.createBoard();
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
        let inserted = false;
        while (!inserted) {
            let row = Math.floor(Math.random() * this.size);
            let col = Math.floor(Math.random() * this.size);
            if (this.board[row][col] === 0) {
                this.board[row][col] = Math.random() < 0.9 ? 2 : 4;
                inserted = true;
            }
        }
    }

    // Moves tiles to the left and merges tiles when possible.
    moveLeft() {
        this.board = this.board.map(row => {
            let newRow = row.filter(val => val !== 0); // remove zeros
            for (let i = 0; i < newRow.length - 1; i++) { // combine tiles
                if (newRow[i] === newRow[i + 1]) {
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
    }

    // Moves tiles to the right and merges tiles when possible.
    moveRight() {
        this.board = this.board.map(row => {
            let newRow = row.filter(val => val !== 0);
            for (let i = newRow.length - 1; i > 0; i--) {
                if (newRow[i] === newRow[i - 1]) {
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

    // Checks if the game is over by checking if there are any empty cells and if there are no adjacent cells with the same value.
    checkGameOver() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                if (this.board[i][j] === 0) return false;
                if (j < this.size - 1 && this.board[i][j] === this.board[i][j + 1]) return false;
                if (i < this.size - 1 && this.board[i][j] === this.board[i + 1][j]) return false;
            }
        }
        return true;
    }    
}