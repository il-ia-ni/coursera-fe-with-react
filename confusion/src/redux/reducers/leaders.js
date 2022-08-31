import * as ActionTypes from '../ActionTypes';

export const Leaders = (state = {
    isLoading: true,
    errMssg: null,
    leaders_data: []
}, action) => {
    /* Reducer function that sets an array of objects as an initial state 
    Updates a state immutably based on an action received. See @ https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow#reducers */

    switch (action.type) {

        case ActionTypes.LEADERS_LOADING: 
            return {
                ...state, 
                isLoading: true,
                errorMssg: null,
                leaders_data: []
            }

        case ActionTypes.LEADERS_LOADING_FAILED:
            return {
                ...state,
                isLoading: false,
                errorMssg: action.payload, 
                leaders_data: []
            }

        case ActionTypes.ADD_LEADERS:
            return {
                ...state,
                isLoading: false,
                errorMssg: null,
                leaders_data: action.payload
            }

        default:  
            return state;
    }
};
