export const changeInput = input => {
  return {
    type: 'CHANGE_INPUT',
    input
  };
};

export const addMessage = message => {
  return {
    type: 'ADD_MESSAGE',
    message
  };
};