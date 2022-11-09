import axios from "axios";
import { RECIEVE_EVENTS, GET_ERRORS } from "./types";

export const getEvents = (startStr, endStr) => dispatch =>{
    axios
        .get(`/view/allEvent/${startStr}/${endStr}/`)
        .then(res =>{
            dispatch({
                type: RECIEVE_EVENTS,
                payload: res.data
            })
        //catches any erros and will creat popup messages with them
        }).catch(err => {
            const errors = {
                msg: err.response
            }
            console.log(err.res)
        })
}

