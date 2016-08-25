import { put, fork } from 'redux-saga/effects';
import { takeEvery, takeLatest } from 'redux-saga';

function* addTodoHandler(action){
	/**
	 * @todo call api
	 */
	yield put({type: 'addTodo', payload: action.payload})
}

const testWatcher = function* (){
	yield takeLatest('addTodoAsync', addTodoHandler);
}

export default {
	testWatcher
}