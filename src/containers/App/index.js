import React, { Component } from 'react';
import { connect } from 'react-redux';
import socketIOClient from 'socket.io-client';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Grid, Row, Col } from 'react-bootstrap';
import InputArea from '../../components/InputArea';
import MessageArea from '../../components/MessageArea';
import ChatRoomList from '../../components/ChatRoomList';
import * as actions from '../../actions';
import './App.css';

const socket = socketIOClient('http://localhost:8001/');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
       username: '',
       curRoom: ''
    };
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
    socket.on('get chat rooms', chatrooms => {
      this.props.getChatrooms(chatrooms.chatrooms);
      if (chatrooms.user === this.state.username) {
        this.setState({curRoom: chatrooms.curRoom});
      }
    });
    socket.on('clear chat messages', user => {
      if (user.user === this.state.username) {
        this.props.clearMessages();
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
            <p>{this.state.curRoom}</p>
          </Row>
          <Row>
            <Col sm={9} md={9} lg={9}>
              <MessageArea
                messages={this.props.messages}
              />
            </Col>
            <Col sm={3} md={3} lg={3}>
              <ChatRoomList 
                chatrooms={this.props.chatrooms}
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
              <li>Change nickname: /nick [username]</li>
              <li>join/create room: /join [room name]</li>
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
    messages: state.messages,
    chatrooms: state.chatrooms
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeInput: input => {
      dispatch(actions.changeInput(input));
    },
    addMessage: message => {
      dispatch(actions.addMessage(message));
    },
    clearMessages: () => {
      dispatch(actions.clearMessages());
    },
    getChatrooms: chatrooms => {
      dispatch(actions.getChatrooms(chatrooms));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
