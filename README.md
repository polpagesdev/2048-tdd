# 2048 Game
## Project for the _Test & Qualitat del Software_ class.
### 2048 game developed with JavaScript following a TDD implementation.

>2048 is a game where you combine numbered tiles in order to gain a higher numbered tile. In this game you start with two tiles, the lowest possible number available is two. Then you will play by combining the tiles with the same number to have a tile with the sum of the number on the two tiles.
>
>The game of 2048 does not include complicated controls. The controls you’ll be using are just upward, downward, and sideways. The rules are also simple. You just need to move the tiles, and every time you move one, another tile pops up in a random manner anywhere in the box. When two tiles with the same number on them collide with one another as you move them, they will merge into one tile with the sum of the numbers written on them initially.

Developed by:
- Pol Pages   – **1494769**
- Sergi Vila  – **1531267**

<hr />

# Tests implemented

<div style="width:250px;height:1px;background-color:gray;"></div>

## Equivalent partitions tests
1. You should be able to initialize a board with empty cells.
2. When the game starts, typically two tiles are added to the board in random positions. These tiles can either be a 2 or a 4.
3. After a player moves left, the tiles should shift in the direction of the move, combining equal tiles.
4. After a player moves right, the tiles should shift in the direction of the move, combining equal tiles.
5. After a player moves up, the tiles should shift in the direction of the move, combining equal tiles.
6. After a player moves down, the tiles should shift in the direction of the move, combining equal tiles.
7. A test to check if the combining of tiles works correctly. For example, when two '2' tiles combine, they should become one '4' tile.
8. A test to determine if the game correctly identifies when no moves are left, meaning the game is over.

<div style="width:250px;height:1px;background-color:gray;"></div>

## Limit and frontier values
9. Check if the game recognizes a win when 2048 is reached.
10. Verify that the game identifies when no horizontal moves are possible.
11. Confirm that the game recognizes when no vertical moves can be made.
12. Ensure the game continues if the board is full but combinations are possible.
13. Identify the highest tile after the game is over.

<div style="width:250px;height:1px;background-color:gray;"></div>

## Pairwise testing
14. Single combination move available - move up
15. Single combination move available - move down
16. Single combination move available - move left
17. Single combination move available - move right
18. Multiple combination moves available - move up
19. Multiple combination moves available - move down
20. Multiple combination moves available - move left
21. Multiple combination moves available - move right
22. No combination but moves available - move up
23. No combination but moves available - move down
24. No combination but moves available - move left
25. No combination but moves available - move right
26. No moves possible (game over) - attempt move up
27. No moves possible (game over) - attempt move down
28. No moves possible (game over) - attempt move left
29. No moves possible (game over) - attempt move right

<div style="width:250px;height:1px;background-color:gray;"></div>

## Mock Objects
30. Mocking random tile generation to test how the game behaves when specific tiles are added to the board. Added tile of 2 at the beginning of the board.
31. Mocking random tile generation to test how the game behaves when specific tiles are added to the board. Added tile of 2 at a random position of the board.
32. Mocking random tile generation to test how the game behaves when specific tiles are added to the board. Added tile of 4 at the beginning of the board.
33. Mocking random tile generation to test how the game behaves when specific tiles are added to the board. Added tile of 4 at a random position of the board.
34. Mocking user input to test the game's response without requiring actual user interaction – move up.
35. Mocking user input to test the game's response without requiring actual user interaction – move down.
36. Mocking user input to test the game's response without requiring actual user interaction – move left.
37. Mocking user input to test the game's response without requiring actual user interaction – move right.
38. Mocking the game rendering to test the board state after adding initial tiles.
39. Mocking the game rendering to test the board state after moving left.
40. Mocking the game rendering to test the board state after moving right.
41. Mocking the game rendering to test the board state after moving up.
42. Mocking the game rendering to test the board state after moving down.

<div style="width:250px;height:1px;background-color:gray;"></div>

## Loop testing
43. Testing if addRandomTile adds a tile correctly to an empty board.
44. Testing if addRandomTile does not add a tile to a full board.
45. Testing if moveLeft combines tiles correctly.
46. Testing if moveLeft does not combine tiles when there are no merges.
47. Testing if canMoveHorizontal returns false when there are no possible moves.
48. Testing if canMoveHorizontal returns true when there are possible moves.