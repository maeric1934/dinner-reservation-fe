import React, { useState, useEffect } from "react";
import { axiosInstance } from "./axiosConfig";
import CalendarView from "./CalendarView";
import TableView from "./TableView";
import ConfirmReservationOwner from "./ConfirmReservationOwner";
import { motion } from "framer-motion";

const Reservations = ({setUserValue}) => {
  const [viewTypeId, setViewTypeId] = useState(0);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axiosInstance("/reservations");
        setReservations(response.data);
      } catch (error) {
        console.error("Error making POST request:", error.message);
      }
    };

    fetchReservations();
  }, []);

  const handleViewTypeChange = (e) => {
    setViewTypeId(parseInt(e.target.value, 10));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, transition: { delay: 0 } }}
      transition={{ type: "spring", stiffness: 100 }}
      className="card"
      style={{
        minHeight: "70vh",
        maxHeight: "80vh",
        overflowY: 'auto',
        minWidth: "45vw",
        maxWidth: "45%",
        marginRight: "100px",
      }}
    >
      <div className="card-body" style={{maxWidth:'100%'}}>
        <div className="row justify-content-between align-items-center">
          <div className="form-group mb-5" style={{ maxWidth: "200px" }}>
            <label htmlFor="viewType">View Type</label>
            <select
              className="form-control"
              id="viewType"
              onChange={handleViewTypeChange}
              value={viewTypeId}
            >
              <option value={0}>Calendar</option>
              <option value={1}>Table</option>
            </select>
          </div>
          <div className="col-4">
            <button onClick={() => setViewTypeId(2)} className="btn btn-primary">Reservation Update</button>
          </div>
        </div>
        {viewTypeId === 0 && <CalendarView reservations={reservations} />}
        {viewTypeId === 1 && <TableView reservations={reservations} />}
        {viewTypeId === 2 && <ConfirmReservationOwner setUserValue={setUserValue} reservations={reservations} />}
      </div>
    </motion.div>
  );
};

export default Reservations;
