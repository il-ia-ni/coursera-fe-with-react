/* Area of the functions creating action objects for the Redux actions specified in the ActionType.js module

Actions are events that describe something that happened in the application. Any extra data needed to describe what's happening is stored in the "payload" of the action. See @ https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#designing-actions.*/

// ??? SHOULD ACTIONS BE ORGANIZED IN ONE FILE WITH REDUCERS AS "SLICES"??? See @ https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#splitting-reducers

import * as ActionTypes from './ActionTypes';  // ES6 import of all vars from a module

export const addComment = (dishId, rating, author, comment) => ({
/* Creates an ADD_COMMENT type of object based on the states received from the combined reducers of the app
Since this action modifies the comments state only, it is only implemented in the comments.js Comment reducer. Other reducers don't take advantage of this action */
    
    type: ActionTypes.ADD_COMMENT,  // the main key of the action object with a type of the action!
    payload: {  // the object of the data of the action, mapped from the params of the function creating it
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }

});