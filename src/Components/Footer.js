import React from 'react';
import { GAME_STATE_PLAYING } from './Constants';

const Footer = ({ onNewGameClick, onSuggestClick, gameState }) => {
  return (
    <div className="panel footer">
      {
        // Show the "Suggest" button only if the game is currently being played
        gameState === GAME_STATE_PLAYING &&
        <button onClick={onSuggestClick}>Suggest</button>
      }
      {
        // Show the "New Game" button when the game is not in the playing state (idle, win, or draw)
        gameState !== GAME_STATE_PLAYING &&
        <button onClick={onNewGameClick}>New Game</button>
      }
    </div>
  );
};

export default Footer;
