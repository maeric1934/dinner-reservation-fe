import React from "react";
import { toast } from 'react-toastify';
import { axiosInstance } from "./axiosConfig";
import moment from 'moment';

const ConfirmReservationOwner = ({ setUserValue }) => {

  const confirmReservation = async() =>{
    let reservation_token = document.getElementById('reservation_token').value;
    try {
      const response = await axiosInstance("/get-reservation-via-token?reservation_token=" + reservation_token);
      setUserValue({...response.data, reservation_date: moment(response.data.reservation_datetime).format('YYYY-MM-DD')});
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
        <div className="form-group col">
          <label htmlFor={"reservation_token"}>
            <small className="text-danger"> * </small>
            Reservation Token
          </label>
          <input
            type={"text"}
            className="form-control"
            id={"reservation_token"}
            name={"reservation_token"}
            placeholder={"Enter Reservation Token"}
          />
        </div>
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
