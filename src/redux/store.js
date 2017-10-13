import {createStore} from 'redux';

import combineReducers from './reducer';

let store = createStore(combineReducers);

if (module.hot) {
    module.hot.accept('./reducer', () => {
        const nextCombineReducers = require('./reducer').default;
        store.replaceReducer(nextCombineReducers);
    });
}

export default store;