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
        const noMovesLeft = gameBoard.hasLost();
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
        expect(gameBoard.hasLost()).toBeFalsy();
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
        expect(gameBoard.hasLost()).toBeTruthy();
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
        expect(gameBoard.hasLost()).toBeTruthy();
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
        expect(gameBoard.hasLost()).toBeTruthy();
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
        expect(gameBoard.hasLost()).toBeTruthy();
    });
});

/* ---------- Mock objects ---------- */

describe('Mock objects', () => {

    // 30. Mocking random tile generation to test how the game behaves when specific tiles are added to the board.
    test('adds a random tile of 2 at an empty position', () => {
        const gameBoard = new Board();
        gameBoard.addRandomTile = jest.fn(() => {
            gameBoard.board[0][0] = 2;
        });
        gameBoard.addRandomTile();
        expect(gameBoard.board[0][0]).toBe(2);
        expect(gameBoard.addRandomTile).toHaveBeenCalled();
    });

    // 31. Mocking random tile generation to test how the game behaves when specific tiles are added to the board.
    test('adds a random tile of 2 at an empty position', () => {
        const gameBoard = new Board();
        gameBoard.addRandomTile = jest.fn(() => {
            gameBoard.board[2][3] = 2;
        });
        gameBoard.addRandomTile();
        expect(gameBoard.board[2][3]).toBe(2);
        expect(gameBoard.addRandomTile).toHaveBeenCalled();
    });

    // 32. Mocking random tile generation to test how the game behaves when specific tiles are added to the board.
    test('adds a random tile of 4 at an empty position', () => {
        const gameBoard = new Board();
        gameBoard.addRandomTile = jest.fn(() => {
            gameBoard.board[0][0] = 4;
        });
        gameBoard.addRandomTile();
        expect(gameBoard.board[0][0]).toBe(4);
        expect(gameBoard.addRandomTile).toHaveBeenCalled();
    });

    // 33. Mocking random tile generation to test how the game behaves when specific tiles are added to the board.
    test('adds a random tile of 4 at an empty position', () => {
        const gameBoard = new Board();
        gameBoard.addRandomTile = jest.fn(() => {
            gameBoard.board[3][2] = 4;
        });
        gameBoard.addRandomTile();
        expect(gameBoard.board[3][2]).toBe(4);
        expect(gameBoard.addRandomTile).toHaveBeenCalled();
    });

    // 34. Mocking user input to test the game's response without requiring actual user interaction – move up.
    test('processes user input to move tiles up', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [2, 2, 4, 4],
            [0, 0, 0, 0],
            [4, 0, 4, 2],
            [0, 0, 0, 0]
        ];
        const userInput = jest.fn(() => 'up');
        gameBoard.move(userInput());
        expect(gameBoard.board[0]).toEqual([2, 2, 8, 4]);
        expect(gameBoard.board[1].slice(-1)).toEqual([2]);
        expect(gameBoard.board[1].slice(0, 1)).toEqual([4]);
        // Here we check if a random tile was added after the move.
        expect(gameBoard.board.slice(-3).flat().filter(value => value !== 0).length).toBe(3);
    });

    // 35. Mocking user input to test the game's response without requiring actual user interaction – move down.
    test('processes user input to move tiles down', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [2, 2, 4, 4],
            [0, 0, 0, 0],
            [4, 0, 4, 2],
            [0, 0, 0, 0]
        ];
        const userInput = jest.fn(() => 'down');
        gameBoard.move(userInput());
        expect(gameBoard.board[3]).toEqual([4, 2, 8, 2]);
        expect(gameBoard.board[2].slice(0, 1)).toEqual([2]);
        expect(gameBoard.board[2].slice(-1)).toEqual([4]);
        // Here we check if a random tile was added after the move.
        expect(gameBoard.board.slice(0, 3).flat().filter(value => value !== 0).length).toBe(3);
    });

    // 36. Mocking user input to test the game's response without requiring actual user interaction – move left.
    test('processes user input to move tiles left', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [2, 2, 4, 4],
            [0, 0, 0, 0],
            [4, 0, 4, 2],
            [0, 0, 0, 0]
        ];
        const userInput = jest.fn(() => 'left');
        gameBoard.move(userInput());
        expect(gameBoard.board[0].slice(0, 2)).toEqual([4, 8]);
        expect(gameBoard.board[2].slice(0, 2)).toEqual([8, 2]);
        // Here we check if a random tile was added after the move.
        expect(gameBoard.board.flat().filter(value => value !== 0).length).toBe(5);
    });

    // 37. Mocking user input to test the game's response without requiring actual user interaction – move right.
    test('processes user input to move tiles right', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [2, 2, 4, 4],
            [0, 0, 0, 0],
            [4, 0, 4, 2],
            [0, 0, 0, 0]
        ];
        const userInput = jest.fn(() => 'right');
        gameBoard.move(userInput());
        expect(gameBoard.board[0].slice(-2)).toEqual([4, 8]);
        expect(gameBoard.board[2].slice(-2)).toEqual([8, 2]);
        // Here we check if a random tile was added after the move.
        expect(gameBoard.board.flat().filter(value => value !== 0).length).toBe(5);
    });

    // 38. Mocking the game rendering to test the board state after adding initial tiles.
    test('Board state after adding initial tiles', () => {
        let gameBoard = new Board();
        gameBoard.addInitialTiles();
        const renderedOutput = gameBoard.render();
    
        // Split the output into rows and then into cells
        const allCells = renderedOutput.split('\n').flatMap(row => row.split(' '));
    
        // Filter out the '0's and count the non-zero cells
        const nonZeroCells = allCells.filter(cell => cell !== '0');
        const tileCount = nonZeroCells.length;
    
        // Check if two tiles have been added
        expect(tileCount).toBe(2);
    });    

    // 39. Mocking the game rendering to test the board state after moving left.
    test('Board state after moving left', () => {
        let gameBoard = new Board();
        gameBoard.board = [
            [2, 2, 4, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        gameBoard.moveLeft();
        expect(gameBoard.render()).toBe('4 4 0 0\n0 0 0 0\n0 0 0 0\n0 0 0 0');
    });

    // 40. Mocking the game rendering to test the board state after moving right.
    test('Board state after moving right', () => {
        let gameBoard = new Board();
        gameBoard.board = [
            [2, 2, 4, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        gameBoard.moveRight();
        expect(gameBoard.render()).toBe('0 0 4 4\n0 0 0 0\n0 0 0 0\n0 0 0 0');
    });

    // 41. Mocking the game rendering to test the board state after moving up.
    test('Board state after moving up', () => {
        let gameBoard = new Board();
        gameBoard.board = [
            [2, 0, 0, 0],
            [2, 0, 0, 0],
            [4, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        gameBoard.moveUp();
        expect(gameBoard.render()).toBe('4 0 0 0\n4 0 0 0\n0 0 0 0\n0 0 0 0');
    });

    // 42. Mocking the game rendering to test the board state after moving down.
    test('Board state after moving down', () => {
        let gameBoard = new Board();
        gameBoard.board = [
            [2, 0, 0, 0],
            [2, 0, 0, 0],
            [4, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        gameBoard.moveDown();
        expect(gameBoard.render()).toBe('0 0 0 0\n0 0 0 0\n4 0 0 0\n4 0 0 0');
    });
});

/* ---------- Loop testing ---------- */

describe('Loop testing', () => {

    // 43. Testing if addRandomTile adds a tile correctly to an empty board.
    test('addRandomTile adds a tile to an empty board', () => {
        const gameBoard = new Board();
        gameBoard.addRandomTile();
        const tiles = gameBoard.board.flat().filter(tile => tile !== 0);
        expect(tiles.length).toBe(1); // Expect exactly one tile to be added
    });
    
    // 44. Testing if addRandomTile does not add a tile to a full board.
    test('addRandomTile does not add a tile to a full board', () => {
        const gameBoard = new Board();
        gameBoard.board = gameBoard.board.map(row => row.map(() => 2)); // Fill the board
        gameBoard.addRandomTile();
        const tiles = gameBoard.board.flat().filter(tile => tile === 0);
        expect(tiles.length).toBe(0); // Expect no empty tiles
    });

    // 45. Testing if moveLeft combines tiles correctly.
    test('moveLeft combines tiles correctly', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [2, 2, 4, 4],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        gameBoard.moveLeft();
        expect(gameBoard.board[0]).toEqual([4, 8, 0, 0]);
    });
    
    // 46. Testing if moveLeft does not combine tiles when there are no merges.
    test('moveLeft on a row with no merges', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [2, 4, 8, 16],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        gameBoard.moveLeft();
        expect(gameBoard.board[0]).toEqual([2, 4, 8, 16]); // Row remains unchanged
    });

    // 47. Testing if canMoveHorizontal returns false when there are no possible moves.
    test('canMoveHorizontal with no possible moves', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [2, 4, 8, 16],
            [16, 8, 4, 2],
            [2, 4, 8, 16],
            [16, 8, 4, 2]
        ];
        expect(gameBoard.canMoveHorizontal()).toBeFalsy();
    });
    
    // 48. Testing if canMoveHorizontal returns true when there are possible moves.
    test('canMoveVertical with a possible move', () => {
        const gameBoard = new Board();
        gameBoard.board = [
            [2, 4, 8, 16],
            [2, 8, 4, 2],
            [0, 4, 8, 16],
            [0, 0, 0, 0]
        ];
        expect(gameBoard.canMoveVertical()).toBeTruthy();
    });    
});