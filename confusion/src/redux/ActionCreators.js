/* Area of the functions creating action objects for the Redux actions specified in the ActionType.js module

Actions are events that describe something that happened in the application. Any extra data needed to describe what's happening is stored in the "payload" of the action. See @ https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#designing-actions.*/

// ??? SHOULD ACTIONS BE ORGANIZED IN ONE FILE WITH REDUCERS AS "SLICES"??? See @ https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#splitting-reducers

import * as ActionTypes from './ActionTypes';  // ES6 import of all vars from a module
import { DISHES } from '../shared/dishes';

export const addComment = (dishId, rating, author, comment) => ({
    /* Creates an object of type ADD_COMMENT based on the states received from the combined reducers of the app
    Since this action modifies the comments state only, it is only implemented in the comments.js Comment reducer. Other reducers don't take advantage of this action */
    
    type: ActionTypes.ADD_COMMENT,  // the main key of the action object with a type of the action!
    payload: {  // the object of the data of the action, mapped from the params of the function creating it
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }

});

/* AREA of functions affecting the Dishes state of the Redux Store. The funcs are implemented in the Dishes.js in the switch block of the Dishes reducer function */

export const dishesLoading = () => ({
    /* Creates an action object of type DISHES_LOADING to inform that the Dishes objs data is being loaded */
    type: ActionTypes.DISHES_LOADING
});

export const dishesLoadingFailed = (errorMssg) => ({
    /* Creates an action object of type DISHES_LOADING_FAILED with the data of an error message occured while loading Dishes objs data */
    type: ActionTypes.DISHES_LOADING_FAILED,
    payload: errorMssg
});

export const addDishes = (dishes) => ({
    /*  Creates an action object of type ADD_DISHES with a payload based on an array of Dishes objs data received */
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});

export const fetchDishes = () => (dispatch) => {
    /* A thunk function that performs a custom logic (side effects) upon a function it is applied to:
        dispatch 1: calls dishesLoading 
        dispatch 2: calls addDishes - pushes Dishes objs into the state of the Redux Store 
    params of a thunk function:
        dispatch: a Redux dispatch function that sends an action object to the Store to be used by reducers
        getState: not used in this case
        See @ https://redux.js.org/usage/writing-logic-thunks#writing-thunks */
        
    dispatch(dishesLoading(true));

    setTimeout(() => {
        dispatch(addDishes(DISHES));  // Dishes objs data is imported now in the thunk and not in the dishes reducer anymore
    }, 2000);  // a TS Node.js method, returns a function after a delay of 2000 ms. TODO: replace with an async fetch from server
};