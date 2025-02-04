import GameBoard from "./Components/GameBoard";

/* Visualize winning situations */
/*
0   1   2   3
4   5   6   7
8   9   10  11
12  13  14  15
*/
export const isWinner = (GameBoard, currentMove, currentPlayer) => {
    let board = [...GameBoard]; // Clone the board to avoid mutation
    board[currentMove] = currentPlayer;

    const winLines = [
        [0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15], // Rows
        [0, 4, 8, 12], [1, 5, 9, 13], [2, 6, 10, 14], [3, 7, 11, 15], // Columns
        [0, 5, 10, 15], [3, 6, 9, 12] // Diagonals
    ];

    for (let [c1, c2, c3, c4] of winLines) {
        if (board[c1] > 0 && board[c1] === board[c2] && board[c2] === board[c3] && board[c3] === board[c4]) {
            return true;
        }
    }
    return false;
};

// Check if the game is a draw
export const isDraw = (GameBoard, currentMove, currentPlayer) => {
    let board = [...GameBoard]; // Clone the board to avoid mutation
    board[currentMove] = currentPlayer;
    let count = board.reduce((n, x) => n + (x === 0), 0); // Count empty spots
    console.log(`count ${count}`);
    return count === 0;
};

// Get a random valid move for the computer
const getRandomComputerMove = (GameBoard) => {
    let validMoves = [];
    for (let i = 0; i < GameBoard.length; i++) {
        if (GameBoard[i] === 0) {
            validMoves.push(i); // Store valid move indices
        }
    }
    if (validMoves.length === 0) return -1; // No available moves
    return validMoves[Math.floor(Math.random() * validMoves.length)];
};

// Analyze the board to find a strategic move
const getPosition = (GameBoard, movechecks) => {
    for (let check of movechecks) {
        for (let i = 0; i < check.max; i += check.step) {
            let series = "" + 
                GameBoard[i + check.indexes[0]] +
                GameBoard[i + check.indexes[1]] +
                GameBoard[i + check.indexes[2]] +
                GameBoard[i + check.indexes[3]];
            
            switch(series) {
                case "1110": case "2220": return i + check.indexes[3];
                case "1101": case "2202": return i + check.indexes[2];
                case "1011": case "2022": return i + check.indexes[1];
                case "0111": case "0222": return i + check.indexes[0];
                default:
            }
        }
    }
    return -1;
};

// Get the best move for the computer
export const getComputerMove = (GameBoard) => {
    let movechecks = [
        { indexes: [0, 4, 8, 12], max: 4, step: 1 }, // Vertical
        { indexes: [0, 1, 2, 3], max: 16, step: 4 }, // Horizontal
        { indexes: [0, 5, 10, 15], max: 16, step: 16 }, // Diagonal
        { indexes: [3, 6, 9, 12], max: 16, step: 16 } // Diagonal
    ];
    let position = getPosition(GameBoard, movechecks);
    if (position > -1) return position;
    return getRandomComputerMove(GameBoard);
};
