import React from 'react'

const TableView = ({ reservations }) => {
  return (
    <div>
        <table className='table'>
            <thead>
                <tr>
                    <th>Date and Time</th>
                    <th>Reserve By</th>
                    <th className='text-center'>Number of Guest</th>
                </tr>
            </thead>
            <tbody>
                {reservations.map((reservation, integer) => (
                    <tr key={integer}>
                    <td>{reservation.reservation_datetime}</td>
                    <td>{reservation.reservation_first_name + ' ' + reservation.reservation_last_name}</td>
                    <td className='text-center'>{reservation.number_of_guests}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default TableView