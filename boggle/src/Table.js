import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import findAllSolutions from './boggle_solver.js'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 3,
  },
  paper: {
    height: 40,
    width: 50,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: 'grey',
    boxShadow: '0 3px 5px 2px rgba(155, 105, 135, .3)',
  },
  control: {
    padding: theme.spacing(3),
  },
}));

export function RandomGrid() {
  // prettier-ignore
  const dice = ["AAAFRS", "AAEEEE", "AAFIRS", "ADENNN", "AEEEEM",
                "AEEGMU", "AEGMNN", "AFIRSY", "BJKQXZ", "CCNSTW",
                "CEIILT", "CEILPT", "CEIPST", "DHHNOT", "DHHLOR",
                "DHLNOR", "DDLNOR", "EIIITT", "EMOTTT", "ENSSSU",
                "FIPRSY", "GORRVW", "HIPRRY", "NOOTUW", "OOOTTU"];
  let chars = dice.map(cube => cube[Math.floor(Math.random() * cube.length)]);
  chars.sort(() => Math.random() - 0.5); // Shuffle the letters.
  const SIZE = 5;
  let grid = [];
  for (let row = 0; row < SIZE; row++) {
    grid[row] = [];
    for (let col = 0; col < SIZE; ++col) {
      grid[row][col] = chars[SIZE * row + col];
      if (grid[row][col] === "Q") grid[row][col] = "Qu";
    }
  }
  return grid;
}

function GridBuilder({row}){
  const classes = useStyles();

 return (
	<Grid container 
	direction="row"
	justify="center"
  	alignItems="center"
  	item xs={5}
  	>
	 {Object.keys(row).map((key) => {return (<Grid> <Paper className={classes.paper} >{row[key]}</Paper></Grid>)})}
 </Grid>)

}

var grid = RandomGrid()
export default function Table() { 
 // var grid = RandomGrid()
 return Object.keys(grid).map((key) => {return (<GridBuilder row={grid[key]}/>)});
}
 
var dictionary;
try {
   var data = require('./full-wordlist.json');
   var dictionary = data.words;
} catch ( err ) {
   // handle your file not found (or other error) here
}
// var solutions = findAllSolutions(grid)
console.log(dictionary)
console.log(grid)
window.solutions = findAllSolutions(grid,dictionary)
//['a','b', 'c', 'd'];

//['a','b', 'c', 'd']
console.log(window.solutions)

