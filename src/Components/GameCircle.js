//Write "rafce" to create the import react lines (ES7+ React/Redux/React-Native snippets extension in VScode)
import React from 'react'
import '../Game.css';


//Parse Properties and Children from GameBoard
const Gamecircle = ({id, children, className, onCircleClicked}) => {
  return (
    // Create Dynamic Class
    <div className={`gameCircle ${className}`}
    // For parsing multiple prometers we need "() =>"
    onClick={() => onCircleClicked(id)}>
      {children}
    </div>
  )
}

export default Gamecircle;
