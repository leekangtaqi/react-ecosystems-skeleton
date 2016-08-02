import { RouteMatchHandler } from '../util/route.match'
import { getRoutes } from '../../client/routes';
import composeRoot from '../../client/config/root';
import configureStore from '../../client/config/store';

export default function* serverSide(){
	// Note that req.url here should be the full URL path from
	// the original request, including the query string.
	let store = configureStore();
	let routes = getRoutes(store);
	let data = { routes, location: this.path }
	let { code, payload } = yield RouteMatchHandler(data, store);
	switch(code){
		case 500:
			this.status = code;
			this.body = `Internal Server Error ${payload}`;
			break;
		case 301:
			this.status = code;
			this.redirect(payload);
			break;
		case 200:
			this.status = code; 
			yield this.render('index', { html: payload.html, state: payload.state, env: process.env.NODE_ENV});
			break;
		case 404:
			this.status = code;
			this.body = payload;
			break;
		default:
			throw new Error(`error ocurr in flow Match route of server-side rendering`);
	}
}