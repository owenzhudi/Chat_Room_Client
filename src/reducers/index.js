import {combineReducers} from 'redux';
import input from './input';
import messages from './messages';

const reducers = combineReducers({
  input,
  messages
});

export default reducers;