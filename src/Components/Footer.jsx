import React from 'react'

const Footer = () => {
    let footerstyle = {
    
        width: "100%",
        border : "1px solid wheat",
        marginTop: "auto",
        bottom: "0",
        position :"fixed",
        padding: "auto",
        backgroundColor : "#856f6f",
        justifyContent: "center"
      }
      return (
    
        <footer  style={footerstyle}>
    
          <p >
            Copyright &copy;  <strong>Shivam Pathak Assignment</strong>
          </p>
        </footer>
  )
}

export default Footer