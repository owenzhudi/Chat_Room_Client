import React from 'react';

const Message = ({ message }) => {
  if (message.server) {
    return (
      <li>
        <div>{message.message}</div>
      </li>
    );
  }
  return (
    <li>
      <div>{message.username}</div>
      <div>{message.message}</div>
    </li>
  );
};

export default Message;