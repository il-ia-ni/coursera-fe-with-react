/* a (optionally!!! done for convenience) separate script for configuring a single store of states for the whole project (Redux Store) based on the ConfigureStore-cls of Redux */

import { combineReducers, createStore, applyMiddleware } from 'redux';
// general reducer function is replaced with 4 separate ones for each state for more flexible control over the general state. Initial State is initialized by the redux now
import thunk from 'redux-thunk';  // Middleware for chaning the behaviour of dispatching object functions
import logger from 'redux-logger';  // Middleware for logging the actions dispatched to the Redux Store

import { Comments } from './reducers/comments';
import { Dishes } from './reducers/dishes';
import { Leaders } from './reducers/leaders';
import { Promotions } from './reducers/promotions';
// == import * as reducers from './reducers/';
import { useNavigate } from 'react-router-dom';

export const ConfigureStore = () => {
    /* An initial setup of the Redux Store structure. The current Redux application global state (the core data that the application works with, a JS object consisting of arrays of plain JS objects. See @https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#designing-the-state-structure) lives in an object called the store.    
    
    The store state is read-only to the rest of the app (See @ https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#designing-the-state-values). 
    
    Reducer functions are used to update the state in response to actions. Redux uses a "one-way data flow" app structure */

    /* const store = createStore(
        Reducer,
        initialState
    ); */

    const store = createStore(

        combineReducers({  // a redux method (https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#combinereducers) to combine separate reducer functions into a single Root Reducer function upon initialization of the app (see @ https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#creating-the-root-reducer). The Store calls the root reducer once to create a global  state of the app
            // The reducers are split to simplify the code. See @ https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#splitting-reducers
            // the key names you give to combineReducers decides what the key names of your state object will be!
            comments: Comments,
            dishes: Dishes,  // no longer an array of Dishes objs, but an object with 3 attrs (isLoading, errorMssg and dishes_data array, see the Dishes reducer!!! )
            leaders: Leaders,
            promotions: Promotions
        }),
        applyMiddleware(thunk, logger)  // applyMiddleware returns Redux Store enchancers (see params of createStore()). Thunk lets dispatching custom functions to the Redux Store instead of action objects directly (See Main component). Logger displays logs of infos on actions in the browser JS console
    );

    return store;
};

export const withRouter = (Component) => {
    // withRouter is depriciated in react-router-dom v6, the alternative with using hooks is found @ https://github.com/remix-run/react-router/issues/7156 and @ https://stackoverflow.com/questions/64782949/how-to-pass-params-into-link-using-react-router-v6
    const Wrapper = (props) => {
        const history = useNavigate();

        return (
            <Component
                history={history}
                {...props}
            />
        );
    };

    return Wrapper;
};