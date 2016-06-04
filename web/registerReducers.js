let reqContext = require.context('../web', true, /.*reducers.js/);

let reducers = requireAll(reqContext).reduce((o, m)=>{
    for(var p in m['default']){
        o[p] = m['default'][p];
    }
    return o;
}, {});

export default reducers;

function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}