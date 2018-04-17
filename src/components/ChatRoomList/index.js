import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';

class ChatRoomList extends Component {
  render() {
    return (
      <div>
        <List>
          {this.props.chatrooms.map((room, index) => {
            return <ListItem key={index} primaryText={room} />
          })}
        </List>
      </div>
    );
  }
}

export default ChatRoomList;