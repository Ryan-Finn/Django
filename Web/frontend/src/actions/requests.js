import {excludeById, getTodayStr} from './utils'

/*
functions that simulate network requests
*/

let todayStr = getTodayStr()
let eventGuid = 0
let eventDb = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: todayStr,
    end: todayStr
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:00:00',
    end: todayStr + 'T16:00:00'
  }
]
const DELAY = 0
let simulateErrors = false

  export function requestEventCreate(plainEventObject) {
    console.log('[STUB] requesting event create:', plainEventObject)
  
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (simulateErrors) {
          reject(new Error('error'))
        } else {
          let newEventId = createEventId()
          let objWithId = { id: newEventId, ...plainEventObject}
          eventDb.push(objWithId)
          resolve(newEventId)
        }
      }, DELAY)
    })
  }

  export function requestEventsInRange(startStr, endStr) {
    console.log(`[STUB] requesting events from ${startStr} to ${endStr}`)
    return fetch(`/view/allEvent/${startStr}/${endStr}/`, {
      headers:{
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest', //Necessary to work with request.is_ajax()
      },
  })
  .then(response => {
      return response.json() //Convert response to JSON
  })
  // .then(data => console.log(data)); //Perform actions with the response data from the view
      
  }

  export function requestEventDelete(eventId) {
    console.log('[STUB] requesting event delete, id:', eventId)
  
    return new Promise((resolve, reject) => {
      setTimeout(() => { // simulate network delay
        if (simulateErrors) {
          reject(new Error('problem'))
        } else {
          eventDb = excludeById(eventDb, eventId)
          resolve(eventDb)
        }
      }, DELAY)
    })
  }

  export function requestEventUpdate(plainEventObject) {
    console.log('[STUB] requesting event update:', plainEventObject)
  
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (simulateErrors) {
          reject(new Error('problem'))
        } else {
          eventDb = excludeById(eventDb, plainEventObject.id)
          eventDb.push(plainEventObject)
          resolve(eventDb)
        }
      }, DELAY)
    })
  }

  function createEventId() {
    return String(eventGuid++)
  }
