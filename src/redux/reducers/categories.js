import uuid from "uuid";
import update from "immutability-helper";

import {
  GET_CATEGORIES,
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  EDIT_CATEGORY
} from "../actionTypes";

const initialState = {
  list: [
    {
      name: "art & music",
      id: uuid.v4()
    },
    {
      name: "Biographies",
      id: uuid.v4()
    },
    {
      name: "Business",
      id: uuid.v4()
    }
  ]
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES: {
      return state;
    }
    case ADD_CATEGORY: {
      return update(state, { list: { $push: [action.payload] } });
    }
    case REMOVE_CATEGORY: {
      const newState = {
        list: state.list.filter(item => item !== action.payload)
      };
      return newState;
    }
    case EDIT_CATEGORY: {
      const { id, name } = action.payload;
      const index = state.list.findIndex(item => item.id === id);
      if (index > -1) {
        return update(state, { list: { [index]: { name: { $set: name } } } });
      }
    }
    default:
      return state;
  }
}
