import { put, call } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';

function* addTodoHandler(action){
	
}

const testWatcher = function* (){
	yield takeEvery('addTodo', addTodoHandler);
}

export default {
	testWatcher
}