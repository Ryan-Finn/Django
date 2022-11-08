import { requestEventsInRange, requestEventCreate, requestEventDelete, requestEventUpdate } from './requests'
import { RECIEVE_EVENTS, GET_ERRORS } from "./types";

export default {

    toggleWeekends() {
      return {
        type: 'TOGGLE_WEEKENDS'
      }
    },

    requestEvents(startStr, endStr) {
          // return requestEventsInRange(startStr, endStr).then((plainEventObjects) => {
          //   dispatch({
          //     type: 'RECEIVE_EVENTS',
          //     plainEventObjects
          //   })
          // })
          fetch(`/view/allEvent/${startStr}/${endStr}/`).then(plainEventObjects => {
          dispatch({ 
            type: RECIEVE_EVENTS,
            plainEventObjects
        })
      }).catch(err => {
        const errors = {
            msg: err.plainEventObjects
        }
        dispatch({
            type: GET_ERRORS,
            payload: errors
        })
    });
    },

      deleteEvent(eventId) {
        return (dispatch) => {
          return requestEventDelete(eventId).then(() => {
            dispatch({
              type: 'DELETE_EVENT',
              eventId
            })
          })
        }
      },

    createEvent(plainEventObject) {
        return (dispatch) => {
        return requestEventCreate(plainEventObject).then((newEventId) => {
            dispatch({
            type: 'CREATE_EVENT',
            plainEventObject: {
                id: newEventId,
                ...plainEventObject
            }
            })
        })
        }
    },

    updateEvent(plainEventObject) {
        return (dispatch) => {
          return requestEventUpdate(plainEventObject).then(() => {
            dispatch({
              type: 'UPDATE_EVENT',
              plainEventObject
            })
          })
        }
      },
}