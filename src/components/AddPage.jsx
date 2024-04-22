import React, { useState } from "react";
import "../styles/AddPage.css";
import AddMatchModal from "./AddMatchModal";
import { ToastContainer } from "react-toastify";
const AddPage = () => {
  const [showMatchModal, setShowMatchModal] = useState(false);

  return (
    <div className="full-page-container">
      <div className="row">
        <div className="column">
          <button className="button" onClick={() => setShowMatchModal(true)}>
            Add match
          </button>
        </div>
        <div className="column">
          <button className="button">Add match statistics</button>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <button className="button">Add league</button>
        </div>
        <div className="column">
          <button className="button">Add season</button>
        </div>
      </div>
      {showMatchModal && <AddMatchModal onClose={() => setShowMatchModal(false)} />}
      <ToastContainer />
    </div>
  );
};

export default AddPage;
