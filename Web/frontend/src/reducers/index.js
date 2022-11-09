import {combineReducers} from 'redux';
import { hashById } from '../actions/utils'
import boardinfoReducer from './boardinfoReducer';
import errorsReducer from './errorsReducer';
import messagesReducer from "./messagesReducer";
import { RECIEVE_EVENTS } from "../actions/types";


// Reducers describe how you are going to transition from one state to the next
// Reducers will check Action, and based on that action will modify the Store accordingly
// Reducers and Actions are just arrow functions that returns an object

// This groups all of the reducers together to add to store
export default combineReducers({
    boardinfo: boardinfoReducer,
    errors: errorsReducer,
    messages: messagesReducer,
    weekendsVisible,
    eventsById,
})

function weekendsVisible(weekendsVisible = true, action) {
    switch (action.type) {

      case 'TOGGLE_WEEKENDS':
        return !weekendsVisible

      default:
        return weekendsVisible
    }
  }

  function eventsById(eventsById = {}, action) {
    switch (action.type) {

          case RECIEVE_EVENTS:
            return hashById(action.payload)

          case 'CREATE_EVENT':
          case 'UPDATE_EVENT':
            return {
              ...eventsById,
              [action.plainEventObject.id]: action.plainEventObject
            }

          case 'DELETE_EVENT':
            eventsById = {...eventsById} // copy
            delete eventsById[action.eventId]
            return eventsById

          default:
            return eventsById
    }
  }
