import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ReturnSolutions from './Table.js'
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import MuiAlert from '@material-ui/lab/Alert';
import NotFound from './Notfound.js'




class Test extends React.Component {
  state = {
    open: true,
  };

  handleClose = event => {
    this.setState({ open: false });
  };
  constructor(props) {
    super(props);

    this.state = {
      text: '',
    };

    window.arr = []
  };

 
  handleConvertString = (event) => {
    let str = this.inputRef.value;

    if (window.solutions.includes(str))
    {
    	if (window.arr.includes(str))
    	{
    		alert("Answer already found");
    	}else{
    		window.arr.push(str)
    	}
    }
    
    this.setState({
      text: window.arr + ' ',
    })
  };
  
  render() {

    return ([
    <div key="1">
        <TextField 
			inputRef={ref => { this.inputRef = ref; }}
			/>
        <Button onClick={this.handleConvertString}>
          Enter
        </Button>
      </div>,
      <div key="2">
	  <p style={{color: 'Black'}} >Words Found: {this.state.text}</p>
    <p style={{color: 'Black'}} >Score: {window.arr.length}</p>
	  </div>
	  ]
    )
    }
}



export default Test;

