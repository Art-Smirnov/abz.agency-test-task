import {useState, useEffect} from 'react';
import axios from 'axios';
import {URL} from "../constants";
import {usersApi} from "../api/api";

const useApi = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = async () => {
    try {
      const response = await usersApi.getPositions();
      setPositions(response.data.positions);
    } catch (error) {
      console.error(error);
    }
  };

  return {positions};
};

export {useApi}
