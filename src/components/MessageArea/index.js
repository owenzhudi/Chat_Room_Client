import React, { Component } from 'react';
import Message from '../Message';
import './style.css';

class MessageArea extends Component {

  componentDidMount() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.messageEnd.scrollIntoView({behavior: 'smooth'});
  };

  render() {
    const { messages } = this.props;
    return (
      <div className="message-area">
        <ul className="content">
          {messages.map((msg, index) => {
            return <Message key={index} message={msg} />
          })}
          <li className="dummy" ref={el => this.messageEnd = el}></li>
        </ul>
      </div>
    );
  }
};

export default MessageArea;