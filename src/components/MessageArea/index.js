import React from 'react';
import Message from '../Message';

const MessageArea = ({messages}) => {
  return (
    <div>
      <ul>
        {messages.map((msg, index) => {
          return <Message key={index} message={msg} />
        })}
      </ul>
    </div>
  );
};

export default MessageArea;