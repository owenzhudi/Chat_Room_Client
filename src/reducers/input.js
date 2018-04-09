const input = (state = '', action) => {
  switch(action.type) {
    case 'CHANGE_INPUT':
      return action.input;
    default:
      return state;
  }
};

export default input;