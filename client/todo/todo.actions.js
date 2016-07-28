const uid = () => Math.random().toString(34).slice(2);
import { push } from 'react-router-redux'

export function addTodo(text){
    return new Promise(function(resolve, reject){
        resolve({
            type: 'addTodo',
            payload: {
                id: uid(),
                isDone: false,
                text: text
            }
        })
    })
}

export function toggleFilter(intention){
    return function toggleFilterBegin(dispatch){
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