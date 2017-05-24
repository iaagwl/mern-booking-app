import { SET_GYM_CLASSES, ADD_GYM_CLASS, GYM_CLASS_FETCHED } from '../actions/constants';

export default function gymclasses(state = [], action = {}) {
  switch (action.type) {
    case ADD_GYM_CLASS:
      return [
        ...state,
        action.gymclass
      ];

    case GYM_CLASS_FETCHED:
      const index = state.findIndex(item => item._id === action.gymclass._id);
      if (index > -1) {
        return state.map(item => {
          if (item._id === action.gymclass._id) return action.gymclass;
          return item;
        });
      } else {
        return [
          ...state,
          action.gymclass
        ];
      }

    case SET_GYM_CLASSES:
      return action.gymclasses;

    default: return state;
  }
}
