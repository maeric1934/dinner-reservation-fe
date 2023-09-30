import React from 'react';
import { useState, useEffect } from 'react';
import Calendar from 'moedim';
import moment from"moment";

function getDate(today) {
  return moment(today).format('LL');
}

const CalendarView = ({ reservations }) => {
  const [dateSelected, setDateSelected] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);


  useEffect(() => {
    // Simulate creating reservation records for each timeslot on the selected date
    const formattedDate = moment(dateSelected).format('YYYY-MM-DD');
    const simulatedTimeSlots = [
      { time: '6:00 AM', reservationsCount: getReservationsCount(formattedDate + ' 18:00') },
      { time: '6:30 AM', reservationsCount: getReservationsCount(formattedDate + ' 18:30') },
      { time: '7:00 AM', reservationsCount: getReservationsCount(formattedDate + ' 19:00') },
      { time: '7:30 AM', reservationsCount: getReservationsCount(formattedDate + ' 19:30') },
      { time: '8:00 AM', reservationsCount: getReservationsCount(formattedDate + ' 20:00') },
      { time: '8:30 AM', reservationsCount: getReservationsCount(formattedDate + ' 20:30') },
      { time: '9:00 AM', reservationsCount: getReservationsCount(formattedDate + ' 21:00') },
      { time: '9:30 AM', reservationsCount: getReservationsCount(formattedDate + ' 21:30') },
      // Add more timeslots and availability as needed
    ];

    setTimeSlots(simulatedTimeSlots);
  }, [dateSelected]);

  function getReservationsCount(dateTime) {
    if(reservations && reservations.length > 0){
      return reservations.filter(reservation => reservation.reservation_datetime == dateTime).length;
    }
    return 0
  }

  return (
    <div className='d-flex flex-wrap justify-content-around p-2'>
        <Calendar onChange={(d) => setDateSelected(d)} value={dateSelected} />
        <div className='p-2'>
            <span>Reservation For { getDate(dateSelected) }</span>
            <table className='table'>
            <thead>
                <tr>
                    <th>Time</th>
                    <th className='text-center'>Slots Available</th>
                </tr>
            </thead>
            <tbody>
                {timeSlots.map((timeSlot, index) => (
                    <tr key={index}>
                      <td>{timeSlot.time}</td>
                      <td className='text-center'>3/{3 - timeSlot.reservationsCount} <small className={timeSlot.reservationsCount >= 3 ? 'text-danger' : 'text-success'}>{timeSlot.reservationsCount >= 3 ? 'FULLY BOOKED' : 'Available'}</small></td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default CalendarView