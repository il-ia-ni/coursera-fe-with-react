/* a (optionally!!! done for convenience) separate script for configuring a single store of states for the whole project (Redux Store) based on the ConfigureStore-cls of Redux */

import { combineReducers, createStore } from 'redux';
// general reducer function is replaced with 4 separate ones for each state for more flexible control over the general state. Initial State is initialized by the redux now
import { Comments } from './reducers/comments';
import { Dishes } from './reducers/dishes';
import { Leaders } from './reducers/leaders';
import { Promotions } from './reducers/promotions';
// == import * as reducers from './reducers/';
import { useNavigate } from 'react-router-dom';

export const ConfigureStore = () => {

    /* const store = createStore(
        Reducer,
        initialState
    ); */

    const store = createStore(
        combineReducers({
            comments: Comments,
            dishes: Dishes,
            leaders: Leaders,
            promotions: Promotions
        })
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