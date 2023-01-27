import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Card from "./Card";
import Button from "../UI/Button";
import Preloader from "../Preloader";
import "./CardsSection.sass";

const CardsSection = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // const filteredUsers = users.sort((user1, user2) => user1.registration_timestamp - user2.registration_timestamp)

  async function fetchData(page = 1) {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${page}&count=6`);
      setUsers(users.concat(response.data.users));
      setIsLoading(false);
      setTotalPages(response.data.total_pages)
    } catch (error) {
      console.error(error)
      setError(true)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   setUsers(users.sort((a, b) => new Date(b.registration_timestamp) - new Date(a.registration_timestamp)));
  // }, [users]);

  const handleShowMore = () => {
    setCurrentPage(currentPage + 1);
    fetchData(currentPage + 1);
  }

  return (
    <div className="cards-section container">
      <h1 className="cards-section-title">Working with GET request</h1>
      <div className="cards-section-grid">
        {users.map(({id, name, email, phone, position, photo, registration_timestamp}) =>
          <Card
            key={id}
            name={name}
            email={email}
            phone={phone}
            position={position}
            photo={photo}
            // registration_timestamp={registration_timestamp}
          />
        )}
      </div>
      {isLoading && <Preloader/>}
      {currentPage < totalPages &&
        <Button onClick={handleShowMore}>Show More</Button>
      }
      {error && <span className="cards-section-error-message">Something went wrong :(</span>}
    </div>
  );
}
export default CardsSection