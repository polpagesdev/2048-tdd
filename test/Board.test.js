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

    // 3.1. After a player moves left, the tiles should shift in the direction of the move, combining equal tiles.
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

    // 3.2. After a player moves right, the tiles should shift in the direction of the move, combining equal tiles.
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

    // 3.3. After a player moves up, the tiles should shift in the direction of the move, combining equal tiles.
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

    // 3.4. After a player moves down, the tiles should shift in the direction of the move, combining equal tiles.
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

    // 4. A test to check if the combining of tiles works correctly. For example, when two '2' tiles combine, they should become one '4' tile.
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

    // 5. A test to determine if the game correctly identifies when no moves are left, meaning the game is over.
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
