import { useState, useEffect } from "react";
import { createStage } from "../helpers";

export const useStage = (player, resetPlayer) => {
  const [stage, setStage] = useState(createStage());
  const [rowsCleared, setRowsCleared] = useState(0);

  useEffect(() => {
    setRowsCleared(0);
    const clearRows = newStage =>
      newStage.reduce((accumulator, row) => {
        if(row.findIndex(cell => cell[0] === 0) === -1){
          setRowsCleared(prev => prev + 1);
          accumulator.unshift(new Array(newStage[0].length).fill([0, 'clear']));
          return accumulator;
        }
        accumulator.push(row);
        return accumulator;
      }, [])
    const updateStage = prevStage => {
      const newStage = prevStage.map(row =>
        row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
        );

        player.pentamino.forEach((row, y) => {
          row.forEach((value, x) => {
            if(value !== 0) {
              newStage[y + player.pos.y][x + player.pos.x] = [
                value,
                `${player.collided ? 'merged' : 'clear'}`,
              ];
            }
          });
        });

        if(player.collided) {
          resetPlayer();
          return clearRows(newStage);
        }

      return newStage;
    };

    setStage(prev => updateStage(prev));

  }, [player, resetPlayer]);

  return [stage, setStage, rowsCleared];
};