import axios from 'axios';
import { ADD_GYM_CLASS } from './constants';

export function addClass(gymclass){
  return {
    type: ADD_GYM_CLASS,
    gymclass
  }
}

export function createEvent(data) {
  return dispatch => {
    return axios.post('/api/gymclasses', data)
      .then(res => dispatch(addClass(res.data.gymclass)));
  }
}
