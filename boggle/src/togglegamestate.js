import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import {GAME_STATE} from './gamestate_enum.js';
import './ToggleGameState.css';

function ToggleGameState({gameState, setGameState}) {

  const [buttonText, setButtonText] = useState("Start game!");

  function updateGameState() {
    var fiveMinutes = 60 * 5,
    display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
    if (gameState === GAME_STATE.BEFORE || gameState === GAME_STATE.ENDED) {
      setGameState(GAME_STATE.IN_PROGRESS);
      setButtonText("End game");
    } else if (gameState === GAME_STATE.IN_PROGRESS) {
      setGameState(GAME_STATE.ENDED);
      window.setter = undefined
      setButtonText("Start game!");
    }
  }

  return (
    <div className="Toggle-game-state">
      <Button onClick={() => updateGameState()} class="myButton" >
         {buttonText}
      </Button>
    </div>
  );
}

function startTimer(duration, display) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;
    function timer() {
        // get the number of seconds that have elapsed since 
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds; 

        if (diff <= 0) {
            // add one second so that the count down starts at the full duration
            // example 05:00 not 04:59
            start = Date.now() + 1000;
        }
    };
    // we don't want to wait a full second before the timer starts
    timer();
    setInterval(timer, 1000);
}

export default ToggleGameState;