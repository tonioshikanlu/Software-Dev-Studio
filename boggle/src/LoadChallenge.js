import React from 'react';
import * as firebase from 'firebase';
import 'firebase/firestore';
import './ToggleGameState.css';
import './App.css';


window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


function LoadChallenge(props) {
    const [apiResult, setApiResult] = React.useState(null);
    const [score, setScore] = React.useState(null);
    async function LChallenge() {
        const db = firebase.firestore();
        const querySnapshot = await db.collection("challenge_grids").get();
        const result = querySnapshot.docs.map(function (doc) {
            return doc.data();
        });
        let dict = result[0];
        var chal_1 = dict[Object.keys(dict)[0]]
        var chal_2 = dict[Object.keys(dict)[1]]
        var chal_3 = dict[Object.keys(dict)[2]]
        var chal_Arr = [[chal_1],[chal_2],[chal_3]];
        setApiResult(chal_Arr);
        setScore(result[1])
    }
    
    function display_load() {
        document.getElementById("myDropdown").classList.toggle("show");
        LChallenge()        
    }

    function setvariable(num){
      window.setter = num
    }

    const sendData = () => {
         props.parentCallback([apiResult,score]);
    }

    return (
        <div class="Toggle-game-state">
            {sendData()}
            <button class="dropbtn" onClick={() => display_load()} >
                Load Challenge
                <div id="myDropdown" class="dropdown-content">
                    <button class="myButton" onClick={() => setvariable(0)}>Challenge 1</button>
                    <button class="myButton" onClick={() => setvariable(1)}>Challenge 2</button>
                    <button class="myButton" onClick={() => setvariable(2)}>Challenge 3</button>
                </div>
            </button>
            
        </div>
    );
}
export default LoadChallenge;
