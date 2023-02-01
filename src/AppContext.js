import {createContext, useContext, useEffect, useReducer, useRef, useState} from "react"
import appReducer, {initialState} from "./reducers";
import axios from "axios";
import actions from "./actions/actions";
import {usersApi} from "./api/api";

const AppContext = createContext(initialState)

export const AppProvider = ({children}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [response, setResponse] = useState();

  const shouldFetch = useRef(true)

  useEffect(() => {
    if(shouldFetch.current){
      shouldFetch.current = false;
      fetchUsers();
    }
  }, [shouldFetch]);
  const fetchUsers = async (page = 1) => {
    dispatch(actions.fetchUsers());
    try {
      const data = await usersApi.getUsers(page)
      dispatch(actions.fetchUsersSuccess(data));
    } catch (error) {
      console.error(error);
      dispatch(actions.fetchUsersError());
    }
  };

  const handleShowMore = () => {
    fetchUsers(state.currentPage + 1);
    dispatch(actions.handleShowMore());
  };

  const handleSubmit = async (values, {setSubmitting}) => {

    try {
      const response = await usersApi.addNewUser(values)
      setResponse(response.data);
      dispatch(actions.addNewUser());
      fetchUsers()
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }

  const value = {
    users: state.users,
    currentPage: state.currentPage,
    totalPages: state.totalPages,
    isLoading: state.isLoading,
    response,
    fetchUsers,
    handleShowMore,
    handleSubmit
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

const useAppContext = () => {
  const context = useContext(AppContext);
  return context
};

export default useAppContext;