import axios from 'axios';
import { ADD_GYM_CLASS, GYM_CLASS_UPDATED, GYM_CLASS_DELETED } from './constants';
import { addFlashMessage } from './flashMessages';

export function addClass(gymclass){
  return {
    type: ADD_GYM_CLASS,
    gymclass
  }
}

export function classUpdated(gymclass){
  console.log('classupdated ',gymclass);
  return {
    type: GYM_CLASS_UPDATED,
    gymclass
  }
}

export function classDeleted(id){
  return {
    type: GYM_CLASS_DELETED,
    id
  }
}

export function updateEvent(data) {
  return dispatch => {
    return axios.put(`/api/gymclasses/${data._id}`, data)
      .then(res => dispatch(classUpdated(res.data.gymclass)));
  }
}

export function applyForEvent(id) {
  return dispatch => {
    return axios.put(`/api/gymclasses/apply/${id}`)
      .then(res => dispatch(classUpdated(res.data.gymclass)));
  }
}

export function createEvent(data) {
  return dispatch => {
    return axios.post('/api/gymclasses', data)
      .then(res => dispatch(addClass(res.data.gymclass)));
  }
}

export function deleteEvent(id) {
  return dispatch => {
    return axios.delete(`/api/gymclasses/${id}`)
      .then(res => dispatch(classDeleted(id))).then(() => {
        dispatch(addFlashMessage({
        type: 'success',
        text: 'Class successfully deleted'
      }))
    }).catch(err => console.log(err));
  }
}
