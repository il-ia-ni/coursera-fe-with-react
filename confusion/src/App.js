import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';  // a React configurator that makes the Redux Store from redux/configureStore available to all connected to Redux components of the app. Must wrap all other contents of the app (incl. React router!)
import { ConfigureStore } from './redux/configureStore';

const redux_store = ConfigureStore();

class App extends Component {

  render() {

    // BrowserRouter of the React-Dom-router is used to manage the navigation between the Views of the SPA. Routes are declared in Main component since it also manages all the data in its state
    // Main is a container component that manages all data and forwards them to presentation components
    return (
      <Provider store={redux_store}>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
