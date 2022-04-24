import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './components/MainComponent';

class App extends Component {

  render() {

    // BrowserRouter is used to manage app navigation with the React Router module @ https://v5.reactrouter.com/web/guides/quick-start

    // Main is a pure container component that manages all data and forwards them to presentation components
    return (
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
