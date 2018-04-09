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
  }

  componentDidMount() {
    socket.on('get username', username => {
      if (this.state.username === '') {
        this.setState({ username: username.username });
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
    socket.on('chat message', message => {
      const {messages} = this.props;
      if (JSON.stringify(messages[messages.length - 1]) !== JSON.stringify(message)) {  // avoid duplicate addition
        this.props.addMessage(message);
      }
    });
    return (
      <MuiThemeProvider>
        <Grid className="App">
          <Row>
            <h3>Chat Room</h3>
            <p>You are: {this.state.username}</p>
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
