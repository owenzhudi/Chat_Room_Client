import React, { Component } from 'react';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid, Row, Col } from 'react-bootstrap';
import InputArea from '../../components/InputArea';
import MessageArea from '../../components/MessageArea';
import * as actions from '../../actions';
import './App.css';

const socket = socketIOClient('http://localhost:8001/');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { username: '' };
    socket.on('receive chat message', message => {
      this.props.addMessage(message);
    });
  }

  componentDidMount() {
    socket.on('get username', username => {
      if (this.state.username === '' || (username.prevName && username.prevName === this.state.username)) {
        this.setState({ username: username.username });
        username.message = `You are known as ${username.username}.`;
        this.props.addMessage(username);  
      } else if (username.prevName){
        username.message = `${username.prevName} is now known as ${username.username}.`;
        this.props.addMessage(username);  
      }    
    });
  }

  handleInputChange = e => {
    this.props.changeInput(e.target.value);
  };

  handleSubmit = e => {
    e.preventDefault();
    const message = { message: this.props.input, username: this.state.username };
    socket.emit('chat message', message);
    //this.props.addMessage(message);
    this.props.changeInput('');
  };

  render() {
    return (
      <MuiThemeProvider>
        <Grid className="App">
          <Row>
            <h3>Chat Room</h3>
          </Row>
          <Row>
            <Col>
              <MessageArea
                messages={this.props.messages}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <InputArea
                input={this.props.input}
                handleInputChange={this.handleInputChange}
                handleSubmit={this.handleSubmit}
              />
            </Col>
          </Row>
          <Row>
            <ul>
              Chat commands:
              <li>Change nickname: /nick (username)</li>
            </ul>
          </Row>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    input: state.input,
    messages: state.messages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeInput: input => {
      dispatch(actions.changeInput(input));
    },
    addMessage: message => {
      dispatch(actions.addMessage(message));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
