import { push } from 'react-router-redux'
import { createAction } from 'redux-actions';

export const addTodo = createAction('addTodoAsync');

export const toggleFilter = createAction('change');

export const toggleTodo = createAction('toggleTodo');

export const doSomeRoute = dispatch => {
    return push('/nest3');
}