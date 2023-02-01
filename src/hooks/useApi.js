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
      const positions = await usersApi.getPositions();
      setPositions(positions);
    } catch (error) {
      console.error(error);
    }
  };

  return {positions};
};

export {useApi}
