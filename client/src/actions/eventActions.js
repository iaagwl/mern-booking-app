import axios from 'axios';
import { ADD_GYM_CLASS, GYM_CLASS_UPDATED } from './constants';

export function addClass(gymclass){
  return {
    type: ADD_GYM_CLASS,
    gymclass
  }
}

export function ClassUpdated(gymclass){
  return {
    type: GYM_CLASS_UPDATED,
    gymclass
  }
}

export function updateEvent(data) {
  return dispatch => {
    return axios.put(`/api/gymclasses/${data._id}`, data)
      .then(res => dispatch(ClassUpdated(res.data.gymclass)));
  }
}

export function createEvent(data) {
  return dispatch => {
    return axios.post('/api/gymclasses', data)
      .then(res => dispatch(addClass(res.data.gymclass)));
  }
}
