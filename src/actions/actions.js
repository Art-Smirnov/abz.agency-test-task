import {
  HANDLE_SHOW_MORE,
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  ADD_NEW_USER
} from "../constants";

export const handleShowMore = () => {
  return {
    type: HANDLE_SHOW_MORE
  }
}

export const fetchUsers = () => {
  return {
    type: FETCH_USERS
  }
}

export const fetchUsersError = () => {
  return {
    type: FETCH_USERS_ERROR
  }
}

export const addNewUser = () => {
  return {
    type: ADD_NEW_USER
  }
}

export const fetchUsersSuccess = (data) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: data
  }
}

export default {
  handleShowMore,
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersError,
  addNewUser
};
