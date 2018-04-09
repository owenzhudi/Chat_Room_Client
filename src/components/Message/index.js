import React from 'react';

const Message = ({ message }) => {
  return (
    <li>
      <div>{message.username}</div>
      <div>{message.message}</div>
    </li>
  );
};

export default Message;