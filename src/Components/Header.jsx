import React from 'react'

const Header = () => {
    let headerStyle = {
        backgroundColor: "#333",
        color: "#fff",
        padding: "4px",
        border :"2px solid white",
        borderWidth: "0.5px"
    }
  return (
    <header style={headerStyle}>
        <h1>Terribly Tiny Tales Assignment</h1>
    </header>
   
  )
}

export default Header
