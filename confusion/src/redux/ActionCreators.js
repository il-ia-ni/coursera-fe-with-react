/* Area of the functions creating action objects for the Redux actions specified in the ActionType.js module */

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