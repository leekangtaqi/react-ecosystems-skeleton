const uid = () => Math.random().toString(34).slice(2);
import { push } from 'react-router-redux'

export function addTodo(text){
    return new Promise((resolve, reject) => {
        return resolve({
            type: 'addTodoAsync',
            payload: {
                id: uid(),
                isDone: false,
                text: text
            }
        })
    })
}

export function toggleFilter(intention){
    return dispatch => {
        setTimeout(()=>{
            dispatch({
                type: 'change',
                payload: intention
            })
        }, 0)
    }
}

export function toggleTodo(id){
    return {
        type: 'toggleTodo',
        payload: id
    }
}

export function doSomeRoute(dispatch){
    return push('/nest3');
}