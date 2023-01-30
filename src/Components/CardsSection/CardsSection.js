import React, {useState, useEffect, memo, useRef} from 'react';
import axios from 'axios';
import Card from "./Card";
import Button from "../UI/Button";
import Preloader from "../Preloader";
import {useUsers} from "../../hooks/useApi"
import useAppContext from "../../AppContext";
import "./CardsSection.sass";

const CardsSection = () => {
  const {users, isLoading, totalPages, error, currentPage, handleShowMore} = useAppContext();

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
export default memo(CardsSection)
