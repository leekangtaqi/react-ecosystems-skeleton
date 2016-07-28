let reqContext = require.context('../client', true, /.*reducers.js/);

let reducers = requireAll(reqContext).reduce((o, m)=>{
    for(var p in m['default']){
        o[p] = m['default'][p];
    }
    return o;
}, {});

export default {
    context: reqContext, 
    reducers
};

function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}