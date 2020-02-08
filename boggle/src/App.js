import React, {Component} from 'react';
import {useState, useEffect} from 'react'; 
import logo from './logo.png';
import './App.css';
import TextInput from './TextInput.js';
import Table from './Table.js';
import { makeStyles } from '@material-ui/core/styles';
import findAllSolutions from './boggle_solver.js';
import LoginButton from './LoginButton.js';
import swal from '@sweetalert/with-react'
import LoadChallenge from './LoadChallenge.js'
import {RandomGrid} from './randomgrid.js';
import {GAME_STATE} from './gamestate_enum.js';
import ToggleGameState from './togglegamestate.js';
import Display from './Display_Score.js'


function Stop_function()
{
  
  let difference = window.arr.filter(x => !window.solutions.includes(x)).concat(window.solutions.filter(x => !window.arr.includes(x)));
  hide(document.querySelector('.timer'));
  swal(
  <div>
    <h1>These are the remaining words!</h1>
    <p>
      {difference.join(', ')}
    </p>
  </div>
)
}

function App() {

const [isActive,setStatus] = useState([]);
const [user,setUser] = useState([]);
const [allSolutions, setAllSolutions] = useState([]);
const [foundSolutions, setFoundSolutions] = useState([]);
const [gameState, setGameState] = useState(GAME_STATE.BEFORE);
const [grid, setGrid] = useState([]);
const [message, SetMessage] = useState([]);
const [data, SetData] = useState([]);

useEffect(() => {
    const wordList = require('./full-wordlist.json');
    let tmpAllSolutions = findAllSolutions(grid, wordList.words);
    window.solutions = tmpAllSolutions
    setAllSolutions(tmpAllSolutions);
  }, [grid]);

useEffect(() => {
    if (gameState === GAME_STATE.IN_PROGRESS) {
      if (window.setter === undefined){
        setGrid(RandomGrid());
        setFoundSolutions([]);
      }
      else{
        let marr = [[['a','b','c']],[['d','e','f']]];
        setGrid(message[window.setter]);
        setFoundSolutions([]);
      }
    }
  }, [gameState]);

function correctAnswerFound(answer) {
    console.log("New correct answer:" + answer);
    setFoundSolutions([...foundSolutions, answer]);
  }

const userlogin = (obj)=>{
  setUser(obj)
}

const handleHide = () =>{
      Stop_function()
  }

const handleRefresh = () =>{
      window.location.reload()
  }

const callbackFunction = (childData) => {
      SetMessage(childData[0])
      SetData(childData[1])
}


  return (
   <div className>
   <LoginButton setUser={(user) => userlogin(user)} />
   <ToggleGameState gameState={gameState}
                       setGameState={(state) => setGameState(state)} />
           <LoadChallenge parentCallback = {callbackFunction}/>          
            <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      { gameState === GAME_STATE.IN_PROGRESS &&
      <div>
      <p>
      <font color="black">Boggle Solver</font>
      </p>
      <div>
      <Table board={grid} />
      <TextInput/>
      </div>
      <button class="myButton" onClick={handleHide}>Reveal Answers</button>
      
      {user != null &&
      <p style={{color: 'Black'}}>Welcome {user.displayName} </p> 
        }
        <Display obj={data}/>
        </div>
      }
      </div>
           </div>
  );
}

function hide (elements) {
  elements = elements.length ? elements : [elements];
  for (var index = 0; index < elements.length; index++) {
    elements[index].style.display = 'none';
  }
}


export default App;