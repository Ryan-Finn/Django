import {combineReducers} from 'redux';
import boardinfoReducer from './boardinfoReducer';
import errorsReducer from './errorsReducer';
import messagesReducer from "./messagesReducer";

// Reducers describe how you are going to transition from one state to the next
// Reducers will check Action, and based on that action will modify the Store accordingly
// Reducers and Actions are just arrow functions that returns an object

// This groups all of the reducers together to add to store
export default combineReducers({
    boardinfo: boardinfoReducer,
    errors: errorsReducer,
    messages: messagesReducer,
});