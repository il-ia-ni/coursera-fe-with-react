import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './components/MainComponent';
import { Provider } from 'react-redux';  // a global Redux Selector (see @https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow#selectors) for the React app that makes the Redux Store from redux/configureStore available to all connected to Redux components of the app. Must wrap all other contents of the app (incl. React router!)
import { ConfigureStore } from './redux/configureStore';

const redux_store = ConfigureStore();

class App extends Component {

  render() {

    // BrowserRouter of the React-Dom-router is used to manage the navigation between the Views of the SPA. Routes are declared in Main component since it also manages all the data in its state
    // Main is a container component that manages all data and forwards them to presentation components
    // Redux uses a "one-way data flow" app structure: The connected Redux Store calls a corresponding reducer function upon receiving an action object to update a state. Then it notifies ALL parts of the UI that are subscribed that the store has been updated. Each UI component that needs data from the store checks to see if the parts of the state they need have changed. Each component that sees its data has changed forces a re-render with the new data, so it can update what's shown on the screen. See @ https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow#redux-application-data-flow
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
