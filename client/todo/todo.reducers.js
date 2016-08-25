import { List, Map } from 'immutable';
import { handleActions } from 'redux-actions';
const uid = () => Math.random().toString(34).slice(2);

export default {
    todos: handleActions({
        'addTodo' (state, action){
            return state.push(Map({
                id: uid(),
                isDone: false,
                text: action.payload
            }))
        },
        'toggleTodo' (state, action){
            return state.map(t => {
                if(t.get('id') === action.payload){
                    return t.update('isDone', isDone => !isDone);
                }else{
                    return t;
                }
            })
        }
    }, List([])),
    
    visibilityFilter: handleActions({
        'change' (state, action){
            return action.payload;
        }
    }, "SHOW_ALL")
}