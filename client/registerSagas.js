let ex = null;
let context = null;
let rootSaga = null;

if(isBrowser()){
    //client-side
    let reqContext = require.context('../client', true, /.*sagas.js/);
    let sagasMap = requireAll(reqContext).reduce((o, m)=>{
        for(var p in m['default']){
            o[p] = m['default'][p];
        }
        return o;
    }, {})
    let sagas = Object.keys(sagasMap).map(k => sagasMap[k]);
    context = reqContext;
    rootSaga = function*(){
        yield sagas.map(saga => saga());
    }
    ex = {
        context: reqContext, 
        rootSaga: rootSaga
    }
}else{
    //server-side
    let rs = [];
    rs.push(require('./todo/todo.sagas'));
    let sagasMap = rs.reduce((o, m) => {
        for(var p in m['default']){
            o[p] = m['default'][p];
        }
        return o;
    }, {});
    let sagas = Object.keys(sagasMap).map(k => sagasMap[k]);
    rootSaga = function*(){
        yield sagas.map(saga => saga());
    }
    ex = {
        rootSaga: rootSaga
    }
}

export {
    context,
    rootSaga
}
export default ex;

function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}

function isBrowser(){
    return typeof window === 'undefined' ? false : true;
}