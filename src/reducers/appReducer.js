import {
  HANDLE_SHOW_MORE,
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  ADD_NEW_USER,
  FETCH_USERS_ERROR
} from "../constants";

export const initialState = {
  users: [],
  currentPage: 1,
  totalPages: 1,
  error: false,
  isLoading: true
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: state.users.concat(action.payload.users),
        isLoading: false,
        totalPages: action.payload.total_pages
      };
    case FETCH_USERS_ERROR:
      return {
        ...state,
        error: true,
        isLoading: false
      };
    case HANDLE_SHOW_MORE:
      return {
        ...state,
        currentPage: state.currentPage + 1
      };
    case ADD_NEW_USER:
      return {
        ...state,
        users: [],
        currentPage: 1
      }
    default:
      return state;
  }
};

export default appReducer;
