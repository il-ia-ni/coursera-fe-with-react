/* a (optionally!!! done for convenience) separate script for configuring a single store of states for the whole project (Redux Store) based on the ConfigureStore-cls of Redux */

import { createStore } from 'redux';
import { Reducer, initialState } from './reducer';
import { useNavigate } from 'react-router-dom';

export const ConfigureStore = () => {

    const store = createStore(
        Reducer,
        initialState
    );

    return store;
};

export const withRouter = (Component) => {
    // withRouter is depriciated in react-router-doum v6, the alternative with using hooks is found @ https://github.com/remix-run/react-router/issues/7156 and @ https://stackoverflow.com/questions/64782949/how-to-pass-params-into-link-using-react-router-v6
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