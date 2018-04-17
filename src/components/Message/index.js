import React from 'react';
import './style.css';

const Message = ({ message }) => {
  if (message.server) {
    return (
      <li className="server">
        <div>{message.message}</div>
      </li>
    );
  }
  return (
    <li className="client">
      <div>{message.username}: {message.message}</div>
    </li>
  );
};

export default Message;