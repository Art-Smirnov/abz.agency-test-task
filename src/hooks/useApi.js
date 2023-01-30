import {useState, useEffect} from 'react';
import axios from 'axios';
import {URL} from "../constants";

const useApi = () => {
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = async () => {
    try {
      const response = await axios.get(`${URL}positions`);
      setPositions(response.data.positions);
    } catch (error) {
      console.error(error);
    }
  };

  return {positions};
};

export {useApi}
