import React, {Component} from 'react';
import logo from './logo.png';
import './App.css';
import TextInput from './TextInput.js';
import Table from './Table.js';
import { makeStyles } from '@material-ui/core/styles';
import findAllSolutions from './boggle_solver.js';
//import user_input from './TextInput.js';
import swal from '@sweetalert/with-react'

var turner = 0
function Stop_function()
{
  if (turner == 1){
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

}

class App extends Component{

state = {
     isActive:false
  }

  handleShow = ()=>{
      this.setState({
          isActive: true
      })
    turner = 1
    var fiveMinutes = 60 * 5,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
  }

  handleHide = () =>{
      this.setState({
          isActive: false
      })
      Stop_function()
  }
  handleRefresh = () =>{
      window.location.reload()
  }
   render(){


       return(
           <div className>
            <header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<p>
			<font color="black">Boggle Solver</font>
			</p>
      <button class="myButton" onClick={this.handleRefresh}>New Game</button>
			{this.state.isActive ? <Table/> : null }
			<button class="myButton" onClick={this.handleShow}>Start</button>
      <button class="myButton" onClick={this.handleHide}>Stop</button>
      {this.state.isActive ? <TextInput /> : null }
			</header>
           </div>

       )
   }
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
function hide (elements) {
  elements = elements.length ? elements : [elements];
  for (var index = 0; index < elements.length; index++) {
    elements[index].style.display = 'none';
  }
}


export default App;