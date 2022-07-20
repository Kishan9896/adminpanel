import * as actionType from "./actionType";

const initiVal = {
  counter: 0,
};

export const counterReducer = (state = initiVal, action) => {
  switch (action.type) {
    case actionType.INCREMENT:
      return { counter: state.counter + 1 };
      break;
    case actionType.DECREMENT:
      return { counter: state.counter - 1 };
      break;
    default:
      return state;
  }
};

export default counterReducer;
