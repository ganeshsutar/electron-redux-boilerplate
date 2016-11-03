const reducer = (state={}, action) => {
  var newState = Object.assign({}, state);
  switch(action.type) {
    case 'SIMPLE_ACTION':
      newState.message = action.payload.message;
  }
  return newState;
};

export default reducer;
