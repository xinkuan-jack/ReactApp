const INCREMENT = "counter/INCREMENT";
const DECREMENT = "counter/DECREMENT";
const RESET = "counter/RESET";

const increment = () => ({type: INCREMENT});
const decrement = () => ({type: DECREMENT});
const reset = () => ({type: RESET});

export {INCREMENT, DECREMENT, RESET, increment, decrement, reset};