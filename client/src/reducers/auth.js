import { SET_CURRENT_USER } from '../actions/constants';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  isAuthenticated: false,
  isAdmin: false,
  user: {}
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case SET_CURRENT_USER:
      console.log(action.user);
      let isAdmin = false;
      if (action.user.username === "admin"){
        isAdmin = true;
      }
      return {
        isAuthenticated: !isEmpty(action.user),
        isAdmin: isAdmin,
        user: action.user
      };
    default: return state;
  }
}
