import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class InputArea extends Component {
  render() {
    const {input, handleInputChange, handleSubmit} = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <TextField
            id="messageInput"
            value={input}
            onChange={handleInputChange}
          />
          <RaisedButton 
            type="submit"
            label="Send"
            primary={true}
          />
        </form>
      </div>
    );
  }
}

export default InputArea;