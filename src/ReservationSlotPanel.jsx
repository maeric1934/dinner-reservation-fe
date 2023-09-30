import React from "react";
import moment from "moment";

function getDate(today) {
  return moment(today).format("LL");
}

const ReservationSlotPanel = ({dateSelected, timeSlots}) => {
  return (
    <div className="p-2">
      <span>Reservation For {getDate(dateSelected)}</span>
      <table className="table">
        <thead>
          <tr>
            <th>Time</th>
            <th className="text-center">Slots Available</th>
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((timeSlot, index) => (
            <tr key={index}>
              <td>{timeSlot.time}</td>
              <td className="text-center">
                3/{3 - timeSlot.reservationsCount}{" "}
                <small
                  className={
                    timeSlot.reservationsCount >= 3
                      ? "text-danger"
                      : "text-success"
                  }
                >
                  {timeSlot.reservationsCount >= 3
                    ? "FULLY BOOKED"
                    : "Available"}
                </small>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationSlotPanel;
