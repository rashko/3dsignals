import { GET_CATEGORIES, ADD_CATEGORY, REMOVE_CATEGORY } from "../actionTypes";

const initialState = {
    list: [{
      name: 'art & music'
    },
    {
      name: 'Biographies'
    },
    {
      name: 'Business'
    }]
  };

  export default function(state = initialState, action) {
    switch (action.type) {
      case GET_CATEGORIES: {
        return state
      }
      case ADD_CATEGORY: {
        return Object.assign({}, state, {
          list: state.list.concat(action.payload)
        });
      }
      case REMOVE_CATEGORY: {
        const newState = {
          list: state.list.filter(item => item !== action.payload)
        }
        return newState;
      }
      default:
        return state;
    }
  }