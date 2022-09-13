import { useState, useReducer } from 'react';
import { getWeek } from '../../utils/date-wrangler';

import WeekPicker from './WeekPicker';
import BookingsGrid from './BookingsGrid';
import BookingDetails from './BookingDetails';

import weekReducer from './weekReducer';

export default function Bookings({ bookable }) {
  // week holds: date, start, end returned from getWeek
  const [week, dispatch] = useReducer(weekReducer, new Date(), getWeek);

  const [booking, setBooking] = useState(null);

  return (
    <div className="bookings">
      <div>
        <WeekPicker dispatch={dispatch} />
        <BookingsGrid
          week={week}
          bookable={bookable}
          booking={booking}
          setBooking={setBooking}
        />
      </div>
      <BookingDetails booking={booking} bookable={bookable} />
    </div>
  );
}
