let ex = null;

if(isBrowser()){
    //client-side
    let reqContext = require.context('../client', true, /.*reducers.js/);
    let reducers = requireAll(reqContext).reduce((o, m)=>{
        for(var p in m['default']){
            o[p] = m['default'][p];
        }
        return o;
    }, {});
    ex = {
        context: reqContext, 
        reducers
    }
}else{
    //server-side
    let rs = [];
    rs.push(require('./todo/todo.reducers'));
    rs.push(require('./login/login.reducers'));
    let reducers = rs.reduce((o, m) => {
        for(var p in m['default']){
            o[p] = m['default'][p];
        }
        return o;
    }, {});
    ex = {
        reducers
    }
}


export default ex;

function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

function isBrowser(){
    return typeof window === 'undefined' ? false : true;
}