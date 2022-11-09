import { DELETE_BOARDINFO, GET_BOARDINFO, ADD_BOARDINFO, PUT_BOARDINFO } from '../actions/types.js';

const initialState = {
    boardinfo: []
}

// Reducers are used to update the state in a specific way
export default function(state = initialState, action) {
    
    // Checking what type of action we have and performing that action
    switch(action.type){

        case GET_BOARDINFO:
            return{
                ...state,
                boardinfo: action.payload
            };

        case PUT_BOARDINFO:
            return{
                ...state, 
                boardinfo: [...state.boardinfo.filter(boardinfo => boardinfo.id !== action.payload.id), action.payload]
            };

        case ADD_BOARDINFO:
            return{
                ...state,
                boardinfo: [...state.boardinfo, action.payload]
            };

        case DELETE_BOARDINFO:
            return{
                ...state,
                boardinfo: state.boardinfo.filter(boardinfo => boardinfo.id !== action.payload)
            };
            
        default:
            return state;
    }
}