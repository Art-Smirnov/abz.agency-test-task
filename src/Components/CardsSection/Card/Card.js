import React, {useState} from 'react';
import defaultAvatar from "./images/photo-cover.svg";
import EllipsisText from "../../EllipsisText";
import "./Card.sass";

const Card = ({name, email, phone, photo, position, registration_timestamp}) => {
  const [imageUrl, setImageUrl] = useState(photo);
  const handleError = () => {
    setImageUrl(defaultAvatar)
  };
  // const sd = new Date(registration_timestamp)

  return (
    <div className="card">
      <img onError={handleError} className="card-avatar" src={imageUrl} alt="avatar"/>
      <EllipsisText className="card-name">{name}</EllipsisText>
      <EllipsisText>{position}</EllipsisText>
      <EllipsisText>{email}</EllipsisText>
      <EllipsisText>{phone}</EllipsisText>
      {/*<span>{registration_timestamp.toLocaleString()}</span>*/}
    </div>
  )
}

export default Card