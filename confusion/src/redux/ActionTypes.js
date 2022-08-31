/* AREA of action types for the project

Actions are events that describe something that happened in the application. Any extra data needed to describe what's happening is stored in the "payload" of the action. See @ https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#designing-actions.
They are used by reducer functions to modify a certain state of the app according to a certain case of the reducer's switch block that accepts the action. 
Action type is speicifed as a string constant - standardized pattern of a structure of a Redux store 
Implementation of the specified in this module actions takes place in ActionCreators.js */

export const ADD_COMMENT = 'ADD_COMMENT';

/* Actions for fetching dishes data */
export const DISHES_LOADING = 'DISHES_LOADING';
export const DISHES_LOADING_FAILED = 'DISHES_LOADING_FAILED';
export const ADD_DISHES = 'ADD_DISHES';

/* Actions for fetching comments data */
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const COMMENTS_LOADING_FAILED = 'COMMENTS_LOADING_FAILED';
// comments are fetched in the background as the initial Home component is loaded. There is no need for the LOADING action for them as long as they are not displayed on the main page

/* Actions for fetching promotions data */
export const ADD_PROMOS = 'ADD_PROMOS';
export const PROMOS_LOADING = 'PROMOS_LOADING';
export const PROMOS_LOADING_FAILED = 'PROMOS_LOADING_FAILED';

/* Actions for fetching leaders data */
export const ADD_LEADERS = 'ADD_LEADERS';
export const LEADERS_LOADING = 'LEADERS_LOADING';
export const LEADERS_LOADING_FAILED = 'LEADERS_LOADING_FAILED';

