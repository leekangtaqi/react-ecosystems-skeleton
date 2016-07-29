import { RouteMatchHandler } from '../util/route.match'
import { routes } from '../../client/routes';
import composeRoot from '../../client/config/root';

export default function* serverSide(){
	// Note that req.url here should be the full URL path from
	// the original request, including the query string.
	let data = { routes, location: this.path }
	let { code, payload } = yield RouteMatchHandler(data);
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
			yield this.render('index', { html: payload.html, state: payload.state });
			break;
		case 404:
			this.status = code;
			this.body = payload;
			break;
		default:
			throw new Error(`error ocurr in flow Match route of server-side rendering`);
	}
}