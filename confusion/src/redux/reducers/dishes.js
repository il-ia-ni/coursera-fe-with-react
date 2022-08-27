import * as ActionTypes from '../ActionTypes';

export const Dishes = (state = {
    isLoading: true,  // a status of fetching the Dishes data into an initially empty dishes array below, also used to display a loading spinner in the View
    errorMssg: null,  // a str message of the error action occured while fetching the Dishes data
    dishes_data: []  // an array of Dishes objs data
}, action) => {
    /* Reducer function that sets an object with initial values of props of the Dishes state of the Redux Store
    Updates a state IMMUTABLY based on an action received. See @ https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow#reducers */

    switch (action.type) {

        case ActionTypes.DISHES_LOADING:  // case of Dishes obs data being fetched
            return {
                ...state,  // spread operator of JS ES6 to create a copy of an object with the following changes for the immutable modification of the state in the Redux Store
                isLoading: true,
                errorMssg: null,
                dishes_data: []
            }

        case ActionTypes.DISHES_LOADING_FAILED:  // case of an error of fetching Dishes objs data
            return {
                ...state,
                isLoading: false,
                errorMssg: action.payload,  // sets the str message of the occured error from the payload of the action
                dishes_data: []
            }

        case ActionTypes.ADD_DISHES:  // case of adding Dishes objs after succsessful fetching of the data
            return {
                ...state,
                isLoading: false,
                errorMssg: null,
                dishes_data: action.payload
            }

        default:  // default case when action object contains no action type (is null), returns the unmodified state
            return state;
    }
};
