import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './components/MainComponent';

class App extends Component {

  render() {

    // BrowserRouter of the React-Dom-router is used to manage the navigation between the Views of the SPA. Routes are declared in Main component since it also manages all the data in its state
    // Main is a container component that manages all data and forwards them to presentation components
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
