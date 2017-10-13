import {INCREMENT, DECREMENT, RESET} from '../actions/counter';

/**
 * 初始化state
 * @type {{count: number}}
 */
const initState = {
    count: 0
};
/**
 * reducer
 * @param state
 * @param action
 * @returns {{count: number}}
 */
const reducer = (state = initState, action) => {
    switch (action.type) {
        case INCREMENT:
            return {
                count: state.count + 1
            };
        case DECREMENT:
            return {
                count: state.count - 1
            };
        case RESET:
            return {count: 0};
        default:
            return state
    }
};

export default reducer;
