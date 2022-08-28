import * as ActionTypes from '../ActionTypes';

export const Promotions = (state = {
    isLoading: true,
    errorMssg: null,
    promos_data: []
}, action) => {
    /* Reducer function that sets an array of objects as an initial state 
    Updates a state immutably based on an action received. See @ https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow#reducers */

    switch (action.type) {

        case ActionTypes.PROMOS_LOADING:  // case of Promotions obs data being fetched
            return {
                ...state,
                isLoading: true,
                errorMssg: null,
                promos_data: []
            }

        case ActionTypes.PROMOS_LOADING_FAILED:  // case of an error of fetching Promotions objs data
            return {
                ...state,
                isLoading: false,
                errorMssg: action.payload,
                promos_data: []
            }

        case ActionTypes.ADD_PROMOS:  // case of adding Promotions objs after succsessful fetching of the data
            return {
                ...state,
                isLoading: false,
                errorMssg: null,
                promos_data: action.payload
            }

        default:
            return state;
    }
};
