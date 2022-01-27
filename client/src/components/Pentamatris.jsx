import React, { useState } from "react";
import axios from 'axios';
import { createStage, checkCollision } from "../helpers.js";
import { usePlayer } from "../hooks/usePlayer.js";
import { useStage } from "../hooks/useStage.js";
import Stage from "./Stage.jsx";
import Display from "./Display.jsx";
import { StyledStart } from "./styles/StyledStart.js";
import Start from "./Start.jsx";
import { useInterval } from "../hooks/useInterval.js";
import NextPiece from "./NextPiece.jsx";
import { StyledPentamatrisWrapper, StyledPentamatris } from "./styles/StyledPentamatris.js";
import { useGameStatus } from "../hooks/useGameStatus.js";
import ScoreBoard from './ScoreBoard.jsx';
import LeaderBoard from './LeaderBoard.jsx';
import Reviews from './Reviews.jsx';
import Favorites from "./Favorites.jsx";
import ReviewTicker from "./Ticker.jsx";


const Pentamatris = () => {
  //state for how quickly pieces fall
  const [dropTime, setDropTime] = useState(null);
  //state for if the game is over
  const [gameOver, setGameOver] = useState(false);

  //the player state that controls where the piece is on the board
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();

  //the stage state for how the current condition of the board
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);

  //state for the current score and unshown values for level and rows cleared
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

  const [showLeaders, setShowLeaders] = useState(false);
  const [showFaves, setShowFaves] = useState(false);
  const [showRevs, setShowRevs] = useState(false);
  const [topScores, settopScores] = useState([]);
  const [faves, setFaves] = useState([]);

  //function that checks if the player can move by checking collision with walls and other pieces
  const movePlayer = dir => {
    if(!checkCollision(player, stage, {x: dir, y: 0})){
      updatePlayerPos({ x: dir, y: 0});
    }
  }

  //function to start the game at initial values
  const startGame = () => {
    setStage(createStage());
    setDropTime(1000);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setLevel(0);
  }

  //drop function
  const drop = () => {
    //set game speed dependent on level
    if(rows > (level + 1) * 10) {
      //increase the level
      setLevel(prev => prev + 1);
      //increase drop speed
      setDropTime(1000 / (level + 1) + 200);
    }
    //check for collision each drop
    //if no collision, piece moves down
    if(!checkCollision(player, stage, {x: 0, y: 1})) {
      updatePlayerPos({ x: 0, y: 1, collided: false})
    } else {
      //if piece hits the top of the stage, game over
      if(player.pos.y < 1) {
        console.log("GameOver");
        setGameOver(true);
        setDropTime(null);
      }
      //set collided to true when piece eventually collides with bottom or other piece
      updatePlayerPos({ x: 0, y: 0, collided: true })
    }
  }

  //function that resumes fall speed when down key is released
  const keyUp =({ keyCode }) => {
    if(!gameOver) {
      if(keyCode === 83) {
        setDropTime(1000 / (level + 1) + 200)
      }
    }
  }

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  }

  const move = ({ keyCode }) => {
    if(!gameOver) {
      if(keyCode === 65) { //A Key
        movePlayer(-1);
      } else if(keyCode === 68) { //D Key
        movePlayer(+1);
      } else if(keyCode === 83) { //S Key
        dropPlayer();
      } else if(keyCode === 87) { //W Key
        playerRotate(stage, 1);
      }
    }
  }
  //implement pause later if there is time
  // const pauseGame = () => {

  // }

  useInterval(() => {
    drop();
  }, dropTime)

  const handleScoresClick = () => {
    setShowLeaders(!showLeaders);
  };

  const handleFavesClick = () => {
    setShowFaves(!showFaves);
  };

  const handleRevsClick = () => {
    setShowRevs(!showRevs);
  };

  const getTopScores = () => {
    axios.get('/api/leaders')
      .then((top5) => {
        settopScores(top5.data);
      })
      .catch(err => console.log('Problem getting Top scores', err));
  };

  const getFavorites = () => {
    axios.get('/favorites')
      .then((faves) => {
        // console.log(faves, 124);
        setFaves(faves.data);
      })
      .catch(err => console.log('Problem getting Favorite Reviews', err));
  }
  
  const showLeaderBoard = () => {
    handleScoresClick();
    getTopScores();
  };

  const showFavorites = () => {
    handleFavesClick();
    // getFavorites();
  };


  return (
    
    <StyledPentamatrisWrapper role="button" tabIndex="0" onKeyDown={event => move(event)} onKeyUp={keyUp}>
      <ReviewTicker />
      <StyledPentamatris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (<Display gameOver={gameOver} text="gameOver" />) : (
            <div>
            {/* <NextPiece /> */}
            <ScoreBoard onClick={showLeaderBoard} gameScore={score}/>
            { showLeaders ? <LeaderBoard topScores={topScores}/> : null}
            <button 
              className='go-to-all-revs'
              onClick={handleRevsClick}
            >SEE REVIEWS</button>
            <button 
              className='go-to-faves'
              onClick={showFavorites}
            >SEE FAVORITES</button>
            { showRevs ? <Reviews onClick={showFavorites} /> : null }
            { showFaves ? <Favorites faves={faves} onClick={handleRevsClick}/> : null }
          </div>
          )}
          <StyledStart callback={startGame} />
        </aside>
      </StyledPentamatris>
    </StyledPentamatrisWrapper>
  )
}

export default Pentamatris;