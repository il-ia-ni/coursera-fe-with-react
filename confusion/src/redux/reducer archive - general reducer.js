/* This script contains a general state of the whole project as well as reducer functions: a pure function returning a new state for the single store of the project */

import { COMMENTS } from '../shared/comments';
import { DISHES } from '../shared/dishes';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';


// an initial configuration of the state of the project. Prev was defined in MainComponent
export const initialState = {
    comments: COMMENTS,
    dishes: DISHES,
    leaders: LEADERS,
    promotions: PROMOTIONS,
};

// a reducer function called by the single store, performing the IMMUTABLE change of a received state (immutable = does not change the received arg directly, returns a new updated version of the state instead)
export const Reducer = (state = initialState, action) => {
    /* 
    at the start of the application the state is not initialized yet, therefore we set it a default value using ES6 notation
    */
    return state;
};