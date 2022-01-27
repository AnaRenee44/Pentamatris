import React from "react";
import { StyledCell } from "./styles/StyledCell";
import { PENTAMINOS } from "../pentaminos";

//Each cell is what makes up a single part of the grid of the game board
//It takes in the type of the Pentamino passing through and takes the color of it as
//the piece passes through

const Cell = ({ type }) => (
  <StyledCell type={type} color={PENTAMINOS[type].color} />
)

export default Cell;