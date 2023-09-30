import React, { useState, useEffect } from 'react';
import Calendar from 'moedim';
import moment from 'moment';
import ReservationSlotPanel from './ReservationSlotPanel';

const CalendarView = ({ reservations }) => {
  const [dateSelected, setDateSelected] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    const formattedDate = moment(dateSelected).format('YYYY-MM-DD');
    const simulatedTimeSlots = [];
    
    if (!moment(formattedDate).isBefore(moment(), 'day')) {
      const startTime = moment('18:00', 'HH:mm');
      const endTime = moment('21:30', 'HH:mm');
      let currentTime = moment(startTime);
      
      while (currentTime.isBefore(endTime)) {
        simulatedTimeSlots.push({
          time: currentTime.format('h:mm A'),
          reservationsCount: getReservationsCount(
            formattedDate + ' ' + currentTime.format('HH:mm')
          ),
        });
        currentTime.add(30, 'minutes');
      }
    }
    
    setTimeSlots(simulatedTimeSlots);
  }, [dateSelected]);

  function getReservationsCount(dateTime) {
    return reservations.filter(
      (reservation) => reservation.reservation_datetime === dateTime
    ).length;
  }

  return (
    <div className="d-flex flex-wrap justify-content-around p-2">
      <Calendar onChange={(d) => setDateSelected(d)} value={dateSelected} />
      {timeSlots.length > 0 && (
        <ReservationSlotPanel dateSelected={dateSelected} timeSlots={timeSlots} />
      )}
      {timeSlots.length == 0 && <h3>Unavailable Date</h3>}
    </div>
  );
};

export default CalendarView;