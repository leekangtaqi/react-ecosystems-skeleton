import { push } from 'react-router-redux';

const logger = store => next => action => {
    let actionName = null;
    let actionShow = null;
    if(typeof action === 'object'){
        actionName = action.type;
        actionShow = action;
    }
    if(typeof action === 'function'){
        actionName = (action.name || action.toString().match(/function\s*([^(]*)\(/)[1]) + '[Async-Thunk]';
        actionShow = "thunk is pending";
    }
    if(action.then && typeof action.then === 'function'){
        actionName = '[Async-Promise]';
        actionShow = action;
    }
    isBrowser() && console.group(actionName);
    console.info('dispatching', actionShow);
    let result = next(action);
    console.log('next state', store.getState());
    isBrowser() && console.groupEnd(actionName);
    return result
}

const timeoutScheduler = store => next => action => {
    if (!action.meta || !action.meta.delay) {
        return next(action)
    }

    let timeoutId = setTimeout(
        () => next(action),
        action.meta.delay
    )

    return function cancel() {
        clearTimeout(timeoutId)
    }
}

const vanillaPromise = store => next => action => {
    if (typeof action.then !== 'function') {
        return next(action)
    }
    return Promise.resolve(action).then(store.dispatch)
}

const readyStatePromise = store => next => action => {
    if (!action.promise) {
        return next(action)
    }

    function makeAction(ready, data) {
        let newAction = Object.assign({}, action, { ready }, data)
        delete newAction.promise
        return newAction
    }

    next(makeAction(false))
    return action.promise.then(
        result => next(makeAction(true, { result })),
        error => next(makeAction(true, { error }))
    )
}

const thunk = store => next => action =>
    typeof action === 'function' ?
        action(store.dispatch, store.getState) :
        next(action)

//helpers
const isBrowser = () => typeof window === 'undefined' ? false : true;

export default {
    logger, timeoutScheduler, vanillaPromise, readyStatePromise, thunk
}