const chatrooms = (state = [], action) => {
  switch(action.type) {
    case 'GET_CHATROOMS':
      return action.chatrooms;
    default:
      return state;
  }
};

export default chatrooms;