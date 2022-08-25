/* AREA of action types for the project

Actions are events that describe something that happened in the application. Any extra data needed to describe what's happening is stored in the "payload" of the action. See @ https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#designing-actions.
They are used by reducer functions to modify a certain state of the app according to a certain case of the reducer's switch block that accepts the action. 
Action type is speicifed as a string constant - standardized pattern of a structure of a Redux store 
Implementation of the specified in this module actions takes place in ActionCreators.js */

export const ADD_COMMENT = 'ADD_COMMENT';