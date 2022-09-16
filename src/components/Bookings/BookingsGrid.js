import { useEffect } from 'react';
import { useBookings, useGrid } from './bookingsHooks';

import Spinner from '../UI/Spinner';

export default function BookingsGrid(props) {
  const { week, bookable, booking, setBooking } = props;

  const { bookings, status, error } = useBookings(
    bookable?.id,
    week.start,
    week.end
  );

  const { grid, dates, sessions } = useGrid(bookable, week.start);

  // Effect
  useEffect(() => {
    // Deselect booking when user switches a week or bookable
    setBooking(null);
  }, [bookable, week.start, setBooking]);

  // UI helper
  const cell = (session, date) => {
    const cellData = bookings?.[session]?.[date] || grid[session][date];

    const isSelected = booking?.session === session && booking?.date === date;

    return (
      <td
        key={date}
        className={isSelected ? 'selected' : null}
        onClick={status === 'success' ? () => setBooking(cellData) : null}
      >
        {cellData.title}
      </td>
    );
  };

  if (!grid) {
    return <p>Waiting for bookable and week details</p>;
  }

  return (
    <>
      {status === 'error' && (
        <p className="bookingsError">
          {`There was a problem loading the bookings data ${error}`}
        </p>
      )}
      <table
        className={
          status === 'success' ? 'bookingsGrid active' : 'bookingsGrid'
        }
      >
        <thead>
          <tr>
            <th>
              <span className="status">
                <Spinner />
              </span>
            </th>
            {dates.map((d) => (
              <th key={d}>{new Date(d).toDateString()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session}>
              <th>{session}</th>
              {dates.map((date) => cell(session, date))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
