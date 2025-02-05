// Import React and styles
//Write "rafce" to create the import react lines (ES7+ React/Redux/React-Native snippets extension in VScode)
import React from 'react'
import '../Game.css';

// Functional component for an individual game circle
//Parse Properties and Children from GameBoard
const Gamecircle = ({id, children, className, onCircleClicked}) => {
  return (
    // Render a circle with a dynamic class and click handler
    // Create Dynamic Class
    <div className={`gameCircle ${className}`}
    // For parsing multiple prometers we need "() =>"
    onClick={() => onCircleClicked(id)}>
      {children}
    </div>
  )
}

export default Gamecircle;
