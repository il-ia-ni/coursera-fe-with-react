import { COMMENTS } from '../../shared/comments';
import * as ActionTypes from '../ActionTypes';  // ES6 import of all vars from a module

export const Comments = (state = COMMENTS, action) => {
    // sets an array of objects as an initial state for the reducer function to be updated upon a recieved action object 

    switch (action.type) {

        case ActionTypes.ADD_COMMENT:
            // Creates a new comment. The action is dispatched in the Main component and is implemented in the DishDetailComponent
            let new_comment = action.payload;

            // a temp solution to generate the metadata of a new Comment object (see attrs in the array of objects in shared/comments), will be moved to the server side later on. 
            new_comment.id = state.length;  // returns the length of the current comments state (of the array!) that is containing all previous commentIDs starting with 0, i.e. arr.length == New ID!
            new_comment.date = new Date().toISOString();

            // Currently the new state is not being persisted (is not saved anywhere) and exists only in the RAM as the app still runs and the view displays it. This will be modified later on
            return state.concat(new_comment);  // since arr.concat() returns a new object (is immutable), it does not mutate the original state object, the Redux flow is being maintained! Changing the state object itself is PROHIBITED!

        default:
            // default case when action object contains no action stype, returns unmodified state
            return state;
    }
};
