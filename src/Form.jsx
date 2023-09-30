import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { deleteRequest, postRequest, updateRequest } from './axiosConfig';
import FormField from './FormField';

const TimeOptions = ({ datetime, setUserValue, userData }) => {
  const selectedTime = datetime.toString().split(' ')[1];

  const handleTimeChange = (e) => {
    setUserValue({ ...userData, reservation_time: e.target.value });
  };

  return (
    <select
      onChange={handleTimeChange}
      value={selectedTime}
      className="form-control"
      id="reservation_time"
      name="reservation_time"
    >
      <option disabled>Select time</option>
      <option value={'18:00'}>6:00 PM</option>
      <option value={'18:30'}>6:30 PM</option>
      <option value={'19:00'}>7:00 PM</option>
      <option value={'19:30'}>7:30 PM</option>
      <option value={'20:00'}>8:00 PM</option>
      <option value={'20:30'}>8:30 PM</option>
      <option value={'21:00'}>9:00 PM</option>
      <option value={'21:30'}>9:30 PM</option>
    </select>
  );
};

const Form = ({ userData, setUserValue, defaultFormValue }) => {
  const [reservationToken, setReservationToken] = useState(null);

  const saveData = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formattedDateTimeString = `${formData.get('reservation_date')} ${formData.get('reservation_time')}`;
    formData.set('reservation_datetime', formattedDateTimeString);

    const requestBody = {};
    formData.forEach((value, key) => {
      requestBody[key] = value;
    });

    try {
      const response = userData.id === -1 ? await postRequest('/add-reservation', requestBody) : await updateRequest('/update-reservation', userData.id, requestBody);

      if (userData.id === -1) {
        setReservationToken(response);
      }

      setUserValue(defaultFormValue);
    } catch (error) {
      console.error('Error making request:', error.message);
    }
  };

  const deleteReservation = async (event) => {
    event.preventDefault();
    try {
      await deleteRequest('/delete-reservation', userData.id);
      setUserValue(defaultFormValue);
    } catch (error) {
      console.error('Error making request:', error.message);
    }
  };

  const handleGuestsChange = (e) => {
    setUserValue({ ...userData, number_of_guests: e.target.value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, transition: { delay: 0 } }}
      transition={{ type: "spring", stiffness: 100 }}
      className="col card"
      style={{
        minHeight: '400px',
        maxHeight: '400px',
        width: "500px",
        maxWidth: "45vw",
        marginLeft: '100px'
      }}
    >
      <div className="card-body">
        <h5 className="card-title">Fill up your reservation form</h5>
        <form onSubmit={saveData}>
          <div className="row py-2">
            <FormField
              value={userData['reservation_first_name']}
              label="First Name"
              userData={userData}
              setUserValue={setUserValue}
              name="reservation_first_name"
              type="text"
              placeholder="Enter first name"
            />
            <FormField
              value={userData['reservation_last_name']}
              label="Last Name"
              userData={userData}
              setUserValue={setUserValue}
              name="reservation_last_name"
              type="text"
              placeholder="Enter last name"
            />
          </div>
          <div className="row py-2">
            <FormField
              value={userData['reservation_date']}
              label="Date"
              userData={userData}
              setUserValue={setUserValue}
              name="reservation_date"
              type="date"
            />
            <div className="form-group col">
              <label htmlFor="reservation_time">
                <small className="text-danger"> * </small>Time
              </label>
              <TimeOptions userData={userData} setUserValue={setUserValue} datetime={userData.reservation_datetime} />
            </div>
          </div>
          <div className="row py-2">
            <FormField
              value={userData['phone_number']}
              label="Phone Number"
              userData={userData}
              setUserValue={setUserValue}
              name="phone_number"
              type="number"
              placeholder="Enter phone number"
            />
            <div className="form-group col">
              <label htmlFor="number_of_guests">
                <small className="text-danger"> * </small>Number of Guests
              </label>
              <select
                onChange={handleGuestsChange}
                value={userData.number_of_guests}
                className="form-control"
                id="number_of_guests"
                name="number_of_guests"
              >
                {[1, 2, 3, 4, 5].map((guests) => (
                  <option key={guests}>{guests}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="container pt-5 d-flex justify-content-around">
            <button type="submit" className="btn btn-primary">
              {userData['id'] != -1 ? 'Update' : 'Book'} Reservation
            </button>
            {
              userData['id'] != -1 &&  
              <button onClick={deleteReservation} type="submit" className="ml-5 btn btn-danger">
                Delete Reservation
              </button>
            }
          </div>
        </form>
      </div>
      <AnimatePresence initial={false}>
        {reservationToken && (
        <div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='token-viewer'
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }} 
                className='background'
                >
                  <div className="card">
                    <div className="card-body p-5">
                      <h5 className="card-title">Reservation Successful</h5><br></br>
                      <span><b>Reservation Token:</b> {reservationToken}</span><br></br>
                      <small><b>NOTE:</b> This is needed when you want to update or delete your reservation</small><br></br>

                      <button 
                        className="btn btn-secondary mt-5 float-right"
                        style={{float:'right'}}
                        onClick={()=>{setReservationToken(null)}}
                      > Close</button>
                    </div>
                  </div>
            </motion.div>
        </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Form;