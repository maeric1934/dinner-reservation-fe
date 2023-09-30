import React from "react";
import FormField from "./FormField";
import { toast } from 'react-toastify';
import { axiosInstance } from "./axiosConfig";

const ConfirmReservationOwner = ({ reservations, setUserValue }) => {

  const confirmReservation = async() =>{
    let reservation_token = document.getElementById('reservation_token').value;
    try {
      const response = await axiosInstance("/get-reservation-via-token?reservation_token=" + reservation_token);
      setUserValue(response.data);
    } catch (error) {
      toast.error('Your reservation is not found. . .', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }

  return (
    <div>
      <h5 className="card-title">Verify your reservation</h5>
      <div className="row p-2">
        <FormField
          label="Reservation Token"
          name="reservation_token"
          type="text"
          placeholder="Enter Reservation Token"
        />
      </div>
      <div className="container pt-5">
        <button
          onClick={() => confirmReservation()}
          className="btn btn-primary"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmReservationOwner;
