import counter from './reducers/counter';

/**
 * 整合reducers
 * @param state
 * @param action
 * @returns {{counter}}
 */
const combineReducers = (state = {}, action) => (
    {counter: counter(state.counter, action)}
);

export default combineReducers;