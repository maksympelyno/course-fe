import React from "react";
import { Link } from "react-router-dom";
import NotFoundImage from "../assets/404.png";
import "../styles/NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <img src={NotFoundImage} alt="Not Found" className="not-found-image" />
      <p className="not-found-text">Error: Unable to display the required page. Please try again later.</p>
      <Link to="/" className="return-button">
        Return home
      </Link>
    </div>
  );
};

export default NotFound;
