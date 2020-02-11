import React, {useState} from 'react';
import Button from "@material-ui/core/Button";
import {MULTI_STATE} from './multiplayer_enum.js';
import './multiplayerstate.css';

function Multiplayer_State({gameState, setmultiGameState}) {

  const [buttonText, setButtonText] = useState("Multiplayer ON");

  function updateGameState() {
    if (gameState === MULTI_STATE.BEFORE || gameState === MULTI_STATE.ENDED) {
      setmultiGameState(MULTI_STATE.IN_PROGRESS);
      setButtonText("Multiplayer OFF");
    } else if (gameState === MULTI_STATE.IN_PROGRESS) {
      setmultiGameState(MULTI_STATE.ENDED);
      setButtonText("Multiplayer ON");
    }
  }

  return (
    <div className="Multi-game-state">
      <Button onClick={() => updateGameState()} class="myButton" >
         {buttonText}
      </Button>
    </div>
  );
}

export default Multiplayer_State;