import axios from "axios";
import { createMessage } from "./messages";
import { GET_BOARDINFO, DELETE_BOARDINFO, ADD_BOARDINFO, PUT_BOARDINFO, GET_ERRORS } from "./types";

// GET BOARDINFO
export const getBoardInfo = () => dispatch =>{
    axios
        //action type
        .get('/api/boardinfo/')
        //the action itsself 
        .then(res =>{
            dispatch({
                type: GET_BOARDINFO,
                payload: res.data
            });
        //catches any errors and will creat popup messages with them
        }).catch(err => {
            const errors = {
                msg: err.response.data,
                status: err.response.status
            }
            dispatch({
                type: GET_ERRORS,
                payload: errors
            })
        });
}

// PUT BOARDINFO
export const putBoardInfo = (boardinfo) => dispatch =>{
    axios
        .put(`/api/boardinfo/${boardinfo.id}/`, boardinfo)
        .then(res => {
            //used for popup message when an action happens
            dispatch(createMessage({ updateBoard: 'Board Updated' }));
            dispatch({
                type: PUT_BOARDINFO,
                payload: res.data
            });
        }).catch(err => {
            const errors = {
                msg: err.response.data,
                status: err.response.status
            }
            dispatch({
                type: GET_ERRORS,
                payload: errors
            })
        });
}

//ADD BOARDINFO
export const addBoardInfo = (boardinfo) => dispatch =>{
    axios
        .post('/api/boardinfo/', boardinfo)
        .then(res => {
            dispatch(createMessage({ addBoard: 'Board Added' }));
            dispatch({
                type: ADD_BOARDINFO,
                payload: res.data
            });
        }).catch(err => {
            const errors = {
                msg: err.response.data,
                status: err.response.status
            }
            dispatch({
                type: GET_ERRORS,
                payload: errors
            })
        });
}


// DELETE BOARDINFO
export const deleteBoardInfo = (id) => dispatch =>{
    axios
        .delete(`/api/boardinfo/${id}/`)
        .then(res => {
            dispatch(createMessage({ deleteBoard: 'Board Deleted' }));
            dispatch({
                type: DELETE_BOARDINFO,
                payload: id
            });
        }).catch(err => {
            const errors = {
                msg: err.response.data,
                status: err.response.status
            }
            dispatch({
                type: GET_ERRORS,
                payload: errors
            })
        });
}