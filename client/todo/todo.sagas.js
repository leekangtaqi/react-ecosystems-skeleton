import { put, call, fork } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';

function* addTodoHandler(action){
	yield put({type: 'addTodo', payload: action.payload})
}

const testWatcher = function* (){
	yield takeEvery('addTodoAsync', addTodoHandler);
}

export default {
	testWatcher
}