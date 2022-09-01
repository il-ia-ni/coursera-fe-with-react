/* Area of the functions creating action objects for the Redux actions specified in the ActionType.js module

Actions are events that describe something that happened in the application. Any extra data needed to describe what's happening is stored in the "payload" of the action. See @ https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#designing-actions.*/

// ??? SHOULD ACTIONS BE ORGANIZED IN ONE FILE WITH REDUCERS AS "SLICES"??? See @ https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#splitting-reducers

import * as ActionTypes from './ActionTypes';  // ES6 import of all vars from a module
import { baseUrl } from '../shared/BaseURL';

/* AREA of actions performing POST requests to update a state in the Redux Store */

export const addFeedback = (feedback) => ({
    type: ActionTypes.ADD_FEEDBACK,
    payload: feedback
})

export const postFeedback = (firstname, lastname, phone, email, isAgreed, prefContact, message) => (dispatch) => {

    const newfeedback = {
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        email: email,
        isAgreed: isAgreed,
        prefContact: prefContact,
        message: message
    }

    newfeedback.date = new Date().toISOString();

    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newfeedback),
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let errorResponse = new Error('Error ' + response.status + ': ' + response.statusText);
                errorResponse.response = response;
                throw errorResponse;
            }
        },
            error => {
                let requestError = new Error(error.message);
                throw requestError;
            })
        .then(response => response.json())
        .then(feedback_data => dispatch(addFeedback(feedback_data)))
        .then(feedback_data => {
            alert("Thank you for your feedback! Following data received:\n" + JSON.stringify(feedback_data))
        })

        .catch(anyError => {
            console.log('Post feedback ', anyError.message);
            alert('An error occured while posting the new feedback\nError: ' + anyError.message);
        })
}

export const addComment = (comment) => ({
    /* Creates an object of type ADD_COMMENT based on the states received from the combined reducers of the app
    Since this action modifies the comments state only, it is only implemented in the comments.js Comment reducer. Other reducers don't take advantage of this action */

    type: ActionTypes.ADD_COMMENT,  // the main key of the action object with a type of the action!
    payload: comment

});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
    /* A thunk creator function that posts a new comment data to the server before dispatching its data into the store using the corresponding action ADD_COMMENT 
        props: a comment-related data received and dispatched in the CommentForm component */

    const newComment = {  // the object of the data of the action, mapped from the params of the function creating it
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }

    newComment.date = new Date().toISOString();

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  // specifies the MIME-type of the data in the payload of the request (Multipurpose Internet Mail Extensions)
        },
        body: JSON.stringify(newComment),  // turns a JS obj into a JSON string for the request data
        credentials: 'same-origin'  // defines a type of a client-derver communication, a counterpart of CORS. See @ https://web.dev/introduction-to-fetch/#response-types
    })
        // Post a comment and handle Errors  
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let errorResponse = new Error('Error ' + response.status + ': ' + response.statusText);
                errorResponse.response = response;
                throw errorResponse;
            }
        },
            error => {
                let requestError = new Error(error.message);
                throw requestError;
            })

        // Format and dispatch the fetched data of the newly posted comment (returnd under code 201-created?)
        .then(response => response.json())  // .json() of a Response object (a Stream of HTTP request) returns another promise that parses the data in the body of the HTTP request to a json AND then returns a plain JS object. See https://developer.mozilla.org/en-US/docs/Web/API/Response/json
        .then(comment_data => dispatch(addComment(comment_data)))

        //
        .catch(anyError => {
            console.log('Post comments ', anyError.message);
            alert('An error occured while posting the new comment\nError: ' + anyError.message);
        })
}


/* AREA of actions logic affecting the Dishes state of the Redux Store. 
These action creator funcs are implemented in the Dishes.js in the switch block of the Dishes reducer function */

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
    /* An arrow thunk creator function that creates a thunk with a custom logic (side effects) upon an action the thunk is applied to:
        dispatch 1: calls dishesLoading 
        dispatch 2: calls addDishes that fethces the data from a server using a promise and pushes Dishes objs into the state of the Redux Store 
    params of a thunk function:
        dispatch: a Redux dispatch function that sends an action object to the Store to be used by reducers
        getState: not used in this case
        See @ https://redux.js.org/usage/writing-logic-thunks#writing-thunks */

    dispatch(dishesLoading(true));

    /* // Archive: the side effect was used for the local data with simulating fetching from a server
        setTimeout(() => {
        dispatch(addDishes(DISHES));  // Dishes objs data is imported now in the thunk and not in the dishes reducer anymore
    }, 2000);  // a TS Node.js method, returns a function after a delay of 2000 ms. TODO: replace with an async fetch from server */

    return (
        fetch(baseUrl + 'dishes') // fetches dishes data from the address http://localhost:3001/dishes creating a promise https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#description

            // Handle Errors    
            .then(response => {
                if (response.ok) {
                    return response;  // returned response is then delivered to the next chained .then promise-handler as its param
                }
                else {
                    let errorResponse = new Error('Error ' + response.status + ': ' + response.statusText);  // creating an Error object containing the error number and error text within the server response object  != ERROR HANDLER below (no answer from the server possible)
                    errorResponse.response = response;
                    throw errorResponse;  // throws an error with the response data in it, that can be handled in the catch-area
                }
            },
                error => {
                    let requestError = new Error(error.message);  // error promise-handler for the cases of problems with communicating to the server. != else-case above when the server communication returns an error!
                    throw requestError;
                })

            // Format and dispatch the fetched data
            .then(response => response.json())  //a callback-func for handling a successful resolve of a promise by converting the response into a json-object to be used in the next .then to operate the data
            .then(dishes_data => dispatch(addDishes(dishes_data)))  // a callback func to dispatch the fetched json-obj to the Redux store under an action of the type ADD_DISHES

            // Handle any errors
            .catch(anyError => dispatch(dishesLoadingFailed(anyError.message)))  // .catch promise-handler works with any errors appeared while executing a fetch in a promise. Sends a message text of an Error obj to the creator function of a dispatched error action
    );
};


/* AREA of actions logic affecting the Comments state of the Redux Store */

export const fetchComments = () => (dispatch) => {
    /* An arrow thunk creator function that creates a thunk with a custom logic (side effects) upon an action the thunk is applied to:
        dispatch 1: calls addDishes - pushes Dishes objs into the state of the Redux Store 
    */

    return (
        fetch(baseUrl + 'comments')

            // Handle Errors
            .then(response => {
                if (response.ok) {
                    return response;
                }
                else {
                    let errorResponse = new Error('Error ' + response.status + ': ' + response.statusText);
                    errorResponse.response = response;
                    throw errorResponse;
                }
            },
                error => {
                    let requestError = new Error(error.message);
                    throw requestError;
                })

            // Format and dispatch the fetched data
            .then(response => response.json())
            .then(comments_data => dispatch(addComments(comments_data)))

            // Handle any errors
            .catch(anyError => dispatch(commentsLoadingFailed(anyError.message)))
    );
};

export const commentsLoadingFailed = (errorMssg) => ({
    /* Creates an action object of type COMMENTS_LOADING_FAILED with the data of an error message occured while loading Comments objs data */
    type: ActionTypes.COMMENTS_LOADING_FAILED,
    payload: errorMssg
});

export const addComments = (comments) => ({
    /*  Creates an action object of type ADD_COMMENTS with a payload based on an array of Comments objs data received */
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});


/* AREA of actions logic affecting the Promotions state of the Redux Store */

export const fetchPromos = () => (dispatch) => {
    /* An arrow thunk creator function that creates a thunk with a custom logic (side effects) upon an action the thunk is applied to:
        dispatch 1: calls promosLoading 
        dispatch 2: calls addPromos that fethces the data from a server and pushes Promotions objs into the state of the Redux Store 
    */

    dispatch(promosLoading(true));

    return (
        fetch(baseUrl + 'promotions')
            // Handle Errors
            .then(response => {
                if (response.ok) {
                    return response;
                }
                else {
                    let errorResponse = new Error('Error ' + response.status + ': ' + response.statusText);
                    errorResponse.response = response;
                    throw errorResponse;
                }
            },
                error => {
                    let requestError = new Error(error.message);
                    throw requestError;
                })
            // Format and dispatch the fetched data
            .then(response => response.json())
            .then(promos_data => dispatch(addPromos(promos_data)))

            // Handle any errors
            .catch(anyError => dispatch(promosLoadingFailed(anyError.message)))
    );
};

export const promosLoading = () => ({
    /* Creates an action object of type PROMOS_LOADING to inform that the Promos objs data is being loaded */
    type: ActionTypes.PROMOS_LOADING
});

export const promosLoadingFailed = (errorMssg) => ({
    /* Creates an action object of type PROMOS_LOADING_FAILED with the data of an error message occured while loading Promos objs data */
    type: ActionTypes.PROMOS_LOADING_FAILED,
    payload: errorMssg
});

export const addPromos = (promos) => ({
    /*  Creates an action object of type ADD_DISHES with a payload based on an array of Dishes objs data received */
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});


/* AREA of actions logic affecting Leaders state of the Redux Store */

export const fetchLeaders = () => (dispatch) => {

    dispatch(leadersLoading(true));

    return (
        fetch(baseUrl + 'leaders')
            .then(response => {
                if (response.ok) {
                    return response;
                }
                else {
                    let errorResponse = new Error('Error ' + response.status + ': ' + response.statusText);
                    errorResponse.response = response;
                    throw errorResponse;
                }
            },
                error => {
                    let requestError = new Error(error.message);
                    throw requestError;
                })
            .then(response => response.json())
            .then(leaders_data => dispatch(addLeaders(leaders_data)))

            .catch(anyError => dispatch(leadersLoadingFailed(anyError.message)))
    )
}

export const leadersLoading = () => ({
    // Action creator function, creates an action object of type LEADERS_LOADING
    type: ActionTypes.LEADERS_LOADING
})

export const leadersLoadingFailed = (errorMssg) => ({
    // Action creator function, creates an action object of type LEADERS_LOADING_FAILED
    type: ActionTypes.LEADERS_LOADING_FAILED,
    payload: errorMssg
})

export const addLeaders = (leaders) => ({
    // Action creator function, creates an action object of type ADD_LEADERS
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
})
