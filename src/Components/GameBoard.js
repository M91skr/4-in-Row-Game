/*Constants.js - Explained the constants used in the game.
Footer.js - Added explanations for when buttons are displayed.
GameBoard.js - Added comments to describe game initialization, handling moves, and rendering.
GameCircle.js - Explained how individual game circles are rendered and interacted with.
Header.js - Clarified how the game state is displayed to users.
App.js - Explained the main app component.*/

import React, { useEffect, useState } from "react";
import '../Game.css';
import Header from "./Header";
import Footer from "./Footer";
import GameCircle from "./GameCircle";
import { isWinner, isDraw, getComputerMove } from "../helper";
import { GAME_STATE_PLAYING, NO_PLAYER, PLAYER_1, PLAYER_2, NO_CIRCLES , GAME_STATE_WIN, GAME_STATE_DRAW } from "./Constants";

const GameBoard = () => {
    // Initialize game state variables
    const [gameBoard, setGameBoard] = useState(Array(NO_CIRCLES).fill(NO_PLAYER)); // Board state
    const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1); // Current player's turn
    const [gameState, setGameState] = useState(GAME_STATE_PLAYING); // Game state
    const [winPlayer, setWinPlayer] = useState(NO_PLAYER); // Winner of the game

    console.log(gameBoard);

    // useEffect runs only once when the component mounts to start the game
    useEffect(() => {
        initGame();
    }, []);

    // Initialize/reset the game
    const initGame = () => {
        console.log(`init game`);
        setGameBoard(Array(NO_CIRCLES).fill(NO_PLAYER)); // Reset the board
        setCurrentPlayer(PLAYER_1); // Set first player
        setGameState(GAME_STATE_PLAYING); // Set game to playing state
    }

    // Render the game board by creating GameCircle components
    const initBoard = () => {
        const circles = [];
        for (let i = 0; i < NO_CIRCLES; i++) {
            circles.push(renderCircle(i));
        }
        return circles;
    };

    // Computer suggests a move and plays it
    const suggestMove = () => {
        circleClicked(getComputerMove(gameBoard));
    }

    // Handle when a circle is clicked
    const circleClicked = (id) => {
        console.log('circle clicked: ' + id);

        // Prevent selecting an already occupied circle
        if (gameBoard[id] !== NO_PLAYER) return;

        // Stop game if it is already won or drawn
        if (gameState !== GAME_STATE_PLAYING) return;

        // Check if the move results in a win
        if (isWinner(gameBoard, id, currentPlayer)) {
            setGameState(GAME_STATE_WIN);
            setWinPlayer(currentPlayer);
        }

        // Check if the move results in a draw
        if (isDraw(gameBoard, id, currentPlayer)) {
            setGameState(GAME_STATE_DRAW);
            setWinPlayer(NO_PLAYER);
        }

        // Update the game board with the new move
        setGameBoard(prev => {
            return prev.map((circle, pos) => {
                if (pos === id) return currentPlayer;
                return circle;
            });
        });

        // Switch to the next player
        setCurrentPlayer(currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1);
        console.log(gameBoard);
        console.log(currentPlayer);
    };

    // Render a single game circle with the correct class and click handler
    const renderCircle = id => {
        return <GameCircle id={id} className={`player_${gameBoard[id]}`} onCircleClicked={circleClicked} />
    }

    return (
        <>
            {/* Header component displays the game state */}
            <Header gameState={gameState} currentPlayer={currentPlayer} winPlayer={winPlayer} />

            {/* Render the game board */}
            <div className="gameBoard">
                {initBoard()} 
            </div>

            {/* Footer component with New Game and Suggest buttons */}
            <Footer onNewGameClick={initGame} onSuggestClick={suggestMove} gameState={gameState} />
        </>
    );
}

export default GameBoard;
