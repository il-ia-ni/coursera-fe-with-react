import React, { Component } from 'react';
import './App.css';
import Main from './components/MainComponent';

class App extends Component {

  render() {

    // Main is a pure container component that manages all data and forwards them to presentation components
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

export default App;
