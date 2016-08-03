import { USER_LOGGED_IN, USER_LOGGED_OUT } from '../constants';

export default {
	user: (user = null, action) => {
		if(action.type === USER_LOGGED_IN){
			return action.payload;
		}
		return user;
	}
}