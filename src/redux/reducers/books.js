import update from "immutability-helper";

import { GET_BOOKS, ADD_BOOK, REMOVE_BOOK, EDIT_BOOK } from "../actionTypes";

const initialState = {
  list: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS: {
      return state;
    }
    case ADD_BOOK: {
      return update(state, { list: { $push: [action.payload] } });
    }
    case REMOVE_BOOK: {
      const newState = {
        list: state.list.filter(item => item !== action.payload)
      };
      return newState;
    }
    case EDIT_BOOK: {
      const { id } = action.payload;
      const index = state.list.findIndex(item => item.id === id);
      if (index > -1) {
        return update(state, { list: { [index]: { $merge: action.payload } } });
      }
      break;
    }
    default:
      return state;
  }
}
