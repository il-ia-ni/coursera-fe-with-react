import { DISHES } from '../../shared/dishes';

export const Dishes = (state = DISHES, action) => {
    // sets an array of objects as an initial state for the reducer function to be updated upon a recieved action object 

    switch (action.type) {
        default:  // default case when action object contains no action stype, returns unmodified state
          return state;
      }
};
