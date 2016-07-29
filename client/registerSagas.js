let ex = null;

if(isBrowser()){
    //client-side
    let reqContext = require.context('../client', true, /.*sagas.js/);
		let sagasMap = requireAll(reqContext).reduce((o, m)=>{
				console.warn(m)
        for(var p in m['default']){
            o[p] = m['default'][p];
        }
        return o;
    }, {})
    let sagas = Object.keys(sagasMap).map(k => sagasMap[k]);
    ex = {
        context: reqContext, 
        rootSaga: function*(){
					yield sagas.map(saga => saga());
				}
    }
}else{
    //server-side
    let rs = [];
    rs.push(require('./todo/todo.sagas'));
    let sagas = rs.reduce((o, m) => {
        for(var p in m['default']){
            o[p] = m['default'][p];
        }
        return o;
    }, {});
    ex = {
        rootSaga: sagas
    }
}


export default ex;

function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

function isBrowser(){
    return typeof window === 'undefined' ? false : true;
}