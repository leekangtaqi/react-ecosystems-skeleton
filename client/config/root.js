import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import React from 'react';

export default function composeRoot(store, mode, routes){

	const history = syncHistoryWithStore(mode, store);

	return {
		root:
			<Provider store={store}>
					<Router routes={routes} history={history}></Router>        
			</Provider>,
		history
	}
}