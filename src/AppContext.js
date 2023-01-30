import {createContext, useContext, useEffect, useReducer, useRef, useState} from "react"
import appReducer, {initialState} from "./reducers";
import axios from "axios";
import {URL} from "./constants";
import actions, {fetchUsers} from "./actions/actions";

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
      const response = await axios.get(
        `${URL}users?page=${page}&count=6`
      );
      dispatch(actions.fetchUsersSuccess(response.data));
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
    const formData = new FormData();
    formData.append('position_id', values.position);
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('photo', values.photo);

    try {
      const tokenResponse = await axios.get(`${URL}token`);

      const response = await axios.post(`${URL}users`, formData, {
        headers: {
          'Token': tokenResponse.data.token,
        },
      });

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