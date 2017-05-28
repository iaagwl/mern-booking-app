import axios from 'axios';
import { SET_GYM_CLASSES, GYM_CLASS_FETCHED } from './constants';

export function setClasses(gymclasses) {
  return {
    type: SET_GYM_CLASSES,
    gymclasses
  }
}

export function classFetched(gymclass) {
  return {
    type: GYM_CLASS_FETCHED,
    gymclass
  }
}

export function fetchClasses() {
  return dispatch => {
    return axios.get('/api/gymclasses')
      .then(res => {
        console.log(res.data.gymclasses);
        //res.data.gymclasses..toString();
        dispatch(setClasses(res.data.gymclasses))
      })
      .catch(err => console.log(err));
  }
}

export function fetchClass(id) {
  return dispatch => {
    return axios.get(`/api/gymclasses/${id}`)
      .then(res => dispatch(classFetched(res.data.gymclass)))
      .catch(err => console.log(err));
  }
}
