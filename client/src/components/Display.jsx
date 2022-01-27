import React from "react";
import { StyledDisplay } from "./styles/StyledDisplay";

//The display is a flexible box that can be adjusted for each desired
//bit of information displayed

const Display = ({ gameOver, text }) => (
  <StyledDisplay gameOver={gameOver}>{text}</StyledDisplay>
)

export default Display;