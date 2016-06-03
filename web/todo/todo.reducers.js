import {List, Map} from 'immutable';

export function todos(todos=List([]), action){
    switch (action.type){
        case 'addTodo':
            return todos.push(Map(action.payload));
        case 'toggleTodo':
            return todos.map(t=>{
                if(t.get('id') === action.payload){
                    return t.update('isDone', isDone => !isDone);
                }else{
                    return t;
                }
            });
        default:
            return todos;
    }
}