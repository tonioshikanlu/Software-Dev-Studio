import React from 'react';
import logo from './logo.svg';
import './App.css';
import TextInput from './TextInput.js';
function App() {
return (
<div className="App">
<header className="App-header">
<img src={logo} className="App-logo" alt="logo" />
<p>
My React App
</p>
<TextInput />
</header>
</div>
);
}
export default App;