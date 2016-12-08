const reducer = (state={count:0}, action) => {
  var newState = Object.assign({}, state);
  switch(action.type) {
    case 'SIMPLE_ACTION':
      newState.message = action.payload.message;
      newState.count = state.count+1;
      break;
    case 'GET_TASKS_FULFILLED':
      newState.tasks = action.payload;
      break;
  }
  return newState;
};

export default reducer;
