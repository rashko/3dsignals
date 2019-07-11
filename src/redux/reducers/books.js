import { GET_BOOKS } from "../actionTypes";

const initialState = {
    books: []
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_BOOKS: {
        return state
      }
      
      default:
        return state;
    }
  }