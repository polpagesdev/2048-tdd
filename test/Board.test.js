/**
 * @jest-environment jsdom
 */

import Board from '../src/Board';

/* ---------- Equivalent partitions ---------- */

describe('Equivalent partitions', () => {

    // 1. You should be able to initialize a board with empty cells.
    test('should start with an empty board', () => {
        const gameBoard = new Board();
        const isEmpty = gameBoard.board.every(row => row.every(cell => cell === 0));
        expect(isEmpty).toBeTruthy();
    });

    // 2. When the game starts, typically two tiles are added to the board in random positions. These tiles can either be a 2 or a 4.
    test('should have two tiles on the board after initialization', () => {
        const gameBoard = new Board();
        gameBoard.addInitialTiles();
        const tileCount = gameBoard.board.flat().filter(cell => cell !== 0).length;
        expect(tileCount).toBe(2);
    });

    // 3. After a player moves left, the tiles should shift in the direction of the move, combining equal tiles.
    test('should move tiles to the left when the left move is made', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [2, 0, 2, 4],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        gameBoard.moveLeft();
        expect(gameBoard.board[0]).toEqual([4, 4, 0, 0]);
    });

    // 4. After a player moves right, the tiles should shift in the direction of the move, combining equal tiles.
    test('should move tiles to the right when the right move is made', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [2, 0, 2, 4],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        gameBoard.moveRight();
        expect(gameBoard.board[0]).toEqual([0, 0, 4, 4]);
    });

    // 5. After a player moves up, the tiles should shift in the direction of the move, combining equal tiles.
    test('should move tiles up when the up move is made', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [0, 0, 2, 4],
            [0, 0, 2, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        gameBoard.moveUp();
        expect(gameBoard.board[0]).toEqual([0, 0, 4, 4]);
    });

    // 6. After a player moves down, the tiles should shift in the direction of the move, combining equal tiles.
    test('should move tiles down when the down move is made', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [0, 0, 2, 4],
            [0, 0, 2, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        gameBoard.moveDown();
        expect(gameBoard.board[3]).toEqual([0, 0, 4, 4]);
    })

    // 7. A test to check if the combining of tiles works correctly. For example, when two '2' tiles combine, they should become one '4' tile.
    test('should combine tiles correctly when moved', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [2, 2, 4, 0],
            [4, 4, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        gameBoard.moveLeft();
        expect(gameBoard.board[0]).toEqual([4, 4, 0, 0]);
        expect(gameBoard.board[1]).toEqual([8, 0, 0, 0]);
    });

    // 8. A test to determine if the game correctly identifies when no moves are left, meaning the game is over.
    test('should determine if no moves are left', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [2, 4, 2, 4],
            [4, 2, 4, 2],
            [2, 4, 2, 4],
            [4, 2, 4, 2]
        ];
        const noMovesLeft = gameBoard.checkGameOver();
        expect(noMovesLeft).toBeTruthy();
    });
});

/* ---------- Limit and frontier values ---------- */

describe('Limit and frontier values', () => {

    // 9. Check if the game recognizes a win when 2048 is reached.
    test('should recognize a win when 2048 tile is reached', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [1024, 1024, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        gameBoard.moveLeft();
        expect(gameBoard.hasWon()).toBeTruthy();
    });

    // 10. Verify that the game identifies when no horizontal moves are possible.
    test('should identify no horizontal moves left', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [2, 4, 2, 4],
            [4, 2, 4, 2],
            [2, 4, 2, 4],
            [4, 2, 4, 2]
        ];
        expect(gameBoard.canMoveHorizontal()).toBeFalsy();
    });

    // 11. Confirm that the game recognizes when no vertical moves can be made.
    test('should identify no vertical moves left', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [2, 4, 2, 4],
            [4, 2, 4, 2],
            [2, 4, 2, 4],
            [4, 2, 4, 2]
        ];
        expect(gameBoard.canMoveVertical()).toBeFalsy();
    });

    // 12. Ensure the game continues if the board is full but combinations are possible.
    test('should not end game if the board is full but moves are available', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [2, 4, 2, 4],
            [4, 2, 4, 2],
            [2, 4, 2, 4],
            [4, 2, 4, 4]
        ];
        expect(gameBoard.checkGameOver()).toBeFalsy();
    });

    //13. Identify the highest tile after the game is over.
    test('should report the highest tile after game over', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [1024, 64, 32, 16],
            [512, 256, 128, 64],
            [256, 128, 64, 32],
            [128, 64, 32, 16]
        ];
        expect(gameBoard.getHighestTile()).toBe(1024);
    });
});

/* ---------- Pairwise Testing ---------- */

describe('Pairwise Tests', () => {
    
    // 14. Single combination move available - move up
    test('Single combination move available - move up', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        gameBoard.moveUp();
        expect(gameBoard.board[0]).toEqual([0, 4, 0, 0]);
    });

    // 15. Single combination move available - move down
    test('Single combination move available - move down', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        gameBoard.moveDown();
        expect(gameBoard.board[3]).toEqual([0, 4, 0, 0]);
    });

    // 16. Single combination move available - move left
    test('Single combination move available - move left', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [0, 2, 2, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        gameBoard.moveLeft();
        expect(gameBoard.board[0]).toEqual([4, 0, 0, 0]);
    })

    // 17. Single combination move available - move right
    test('Single combination move available - move right', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [0, 2, 2, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        gameBoard.moveRight();
        expect(gameBoard.board[0]).toEqual([0, 0, 0, 4]);
    })

    // 18. Multiple combination moves available - move up
    test('Multiple combination moves available - move up', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [2, 2, 4, 4],
            [0, 2, 4, 0],
            [0, 0, 0, 4],
            [2, 0, 0, 0]
        ];
        gameBoard.moveUp();
        expect(gameBoard.board[0]).toEqual([4, 4, 8, 8]);
    });

    // 19. Multiple combination moves available - move down
    test('Multiple combination moves available - move down', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [2, 2, 4, 4],
            [0, 2, 4, 0],
            [0, 0, 0, 4],
            [2, 0, 0, 0]
        ];
        gameBoard.moveDown();
        expect(gameBoard.board[3]).toEqual([4, 4, 8, 8]);
    });

    // 20. Multiple combination moves available - move left
    test('Multiple combination moves available - move left', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [2, 2, 4, 4],
            [0, 0, 0, 0],
            [4, 0, 4, 2],
            [0, 0, 0, 0]
        ];
        gameBoard.moveLeft();
        expect(gameBoard.board[0]).toEqual([4, 8, 0, 0]);
        expect(gameBoard.board[2]).toEqual([8, 2, 0, 0]);
    });

    // 21. Multiple combination moves available - move right
    test('Multiple combination moves available - move right', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [2, 2, 4, 4],
            [0, 0, 0, 0],
            [4, 0, 4, 2],
            [0, 0, 0, 0]
        ];
        gameBoard.moveRight();
        expect(gameBoard.board[0]).toEqual([0, 0, 4, 8]);
        expect(gameBoard.board[2]).toEqual([0, 0, 8, 2]);
    });

    // 22. No combination but moves available - move up
    test('No combination but moves available - move up', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [2, 4, 2, 4],
            [4, 2, 4, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        gameBoard.moveUp();
        expect(gameBoard.board[0]).toEqual([2, 4, 2, 4]);
        expect(gameBoard.board[1]).toEqual([4, 2, 4, 2]);

        // Here we check if 2 random tiles were added in the bottom two rows after the move.
        // expect(gameBoard.board.slice(-2).flat.filter(value => value !== 0).length).toBe(2);
    });

    // 23. No combination but moves available - move down
    test('No combination but moves available - move down', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [2, 4, 2, 4],
            [4, 2, 4, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        gameBoard.moveDown();
        expect(gameBoard.board[2]).toEqual([2, 4, 2, 4]);
        expect(gameBoard.board[3]).toEqual([4, 2, 4, 2]);

        // Here we check if 2 random tiles were added in the top two rows after the move.
        // expect(gameBoard.board.slice(0, 3).flat.filter(value => value !== 0).length).toBe(2);
    });

    // 24. No combination but moves available - move left
    test('No combination but moves available - move left', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [2, 4, 2, 4],
            [4, 2, 4, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        gameBoard.moveLeft();
        expect(gameBoard.board[0]).toEqual([2, 4, 2, 4]);
        expect(gameBoard.board[1]).toEqual([4, 2, 4, 2]);

        // Here we check if 2 random tiles were added in the bottom two rows after the move.
        // expect(gameBoard.board.slice(-2).flat.filter(value => value !== 0).length).toBe(2);
    });

    // 25. No combination but moves available - move right
    test('No combination but moves available - move right', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [2, 4, 2, 4],
            [4, 2, 4, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        gameBoard.moveRight();
        expect(gameBoard.board[0]).toEqual([2, 4, 2, 4]);
        expect(gameBoard.board[1]).toEqual([4, 2, 4, 2]);

        // Here we check if 2 random tiles were added in the bottom two rows after the move.
        // expect(gameBoard.board.slice(-2).flat.filter(value => value !== 0).length).toBe(2);
    });

    // 26. No moves possible (game over) - attempt move up
    test('No moves possible (game over) - attempt move up', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [2, 4, 2, 4],
            [4, 2, 4, 2],
            [2, 4, 2, 4],
            [4, 2, 4, 2]
        ];
        gameBoard.moveUp();
        expect(gameBoard.checkGameOver()).toBeTruthy();
    });

    // 27. No moves possible (game over) - attempt move down
    test('No moves possible (game over) - attempt move down', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [2, 4, 2, 4],
            [4, 2, 4, 2],
            [2, 4, 2, 4],
            [4, 2, 4, 2]
        ];
        gameBoard.moveDown();
        expect(gameBoard.checkGameOver()).toBeTruthy();
    });

    // 28. No moves possible (game over) - attempt move left
    test('No moves possible (game over) - attempt move left', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [2, 4, 2, 4],
            [4, 2, 4, 2],
            [2, 4, 2, 4],
            [4, 2, 4, 2]
        ];
        gameBoard.moveLeft();
        expect(gameBoard.checkGameOver()).toBeTruthy();
    });

    // 29. No moves possible (game over) - attempt move right
    test('No moves possible (game over) - attempt move right', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [2, 4, 2, 4],
            [4, 2, 4, 2],
            [2, 4, 2, 4],
            [4, 2, 4, 2]
        ];
        gameBoard.moveRight();
        expect(gameBoard.checkGameOver()).toBeTruthy();
    });
});
