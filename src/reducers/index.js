import {combineReducers} from 'redux';
import input from './input';
import messages from './messages';
import chatrooms from './chatrooms';

const reducers = combineReducers({
  input,
  messages,
  chatrooms
});

export default reducers;