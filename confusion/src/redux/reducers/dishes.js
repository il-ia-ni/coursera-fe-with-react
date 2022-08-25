import { DISHES } from '../../shared/dishes';

export const Dishes = (state = DISHES, action) => {
    /* Reducer function that sets an array of objects as an initial state 
    Updates a state immutably based on an action received. See @ https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow#reducers */ 

    switch (action.type) {
        default:  // default case when action object contains no action stype, returns unmodified state
          return state;
      }
};
