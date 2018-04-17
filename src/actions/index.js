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

export const clearMessages = () => {
  return {
    type: 'CLEAR_MESSAGES'
  };
};

export const getChatrooms = chatrooms => {
  return {
    type: 'GET_CHATROOMS',
    chatrooms
  };
};