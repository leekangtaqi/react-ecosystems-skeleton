import { fromJS } from 'immutable';

export default function composeInitData(data, store){
	let init = store.getState();
	Object.keys(init).map(key => {
		if(isImmutalbe(init[key])){
			data[key] = fromJS(data[key]);
		}
	})
}
function isImmutalbe(value){
	return value && value.constructor;
}