import React from 'react';
import {useState, useEffect} from 'react'; 

function Display({obj}) {

  function get_score(obj) {
    if (typeof window.setter !== "undefined"){
      let high_score = Object.keys(obj)[window.setter]
      console.log(obj[high_score])
      return obj[high_score]
    }
  }

  return (
    <div>
      <p style={{color: 'Black'}} >High Score: {get_score(obj)}</p>
    </div>
  );

}

export default Display;
