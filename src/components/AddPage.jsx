import React, { useState } from "react";
import "../styles/AddPage.css";
import AddMatchModal from "./AddMatchModal";
import AddMatchStatModal from "./AddMatchStatModal";
import { ToastContainer } from "react-toastify";
const AddPage = () => {
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [showMatchStatsModal, setShowMatchStatsModal] = useState(false);

  return (
    <div className="full-page-container">
      <div className="row">
        <div className="column">
          <button className="button" onClick={() => setShowMatchModal(true)}>
            Add match
          </button>
        </div>
        <div className="column">
          <button className="button" onClick={() => setShowMatchStatsModal(true)}>
            Add match statistics
          </button>
        </div>
      </div>

      {showMatchModal && <AddMatchModal onClose={() => setShowMatchModal(false)} />}
      {showMatchStatsModal && <AddMatchStatModal onClose={() => setShowMatchStatsModal(false)} />}
      <ToastContainer />
    </div>
  );
};

export default AddPage;
