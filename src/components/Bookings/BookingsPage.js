import { useQuery } from 'react-query';
import getData from '../../utils/api';

import { shortISO } from '../../utils/date-wrangler';
import { useBookingsParams } from './bookingsHooks';
import BookablesList from '../Bookables/BookablesList';
import Bookings from './Bookings';
import PageSpinner from '../UI/PageSpinner';

export default function BookingsPage() {
  const {
    data: bookables = [],
    error,
    status,
  } = useQuery('bookables', () =>
    getData(`${process.env.REACT_APP_BASE_URL}/bookables`)
  );

  const { date, bookableId } = useBookingsParams();

  const bookable = bookables.find((b) => b.id === bookableId) || bookables[0];

  function getUrl(id) {
    const root = `/bookings?bookableId=${id}`;
    return date ? `${root}&date=${shortISO(date)}` : root;
  }

  if (status === 'error') {
    return <p>{error.message}</p>;
  }

  if (status === 'loading') {
    return <PageSpinner />;
  }

  return (
    <main className="bookings-page">
      <BookablesList
        bookable={bookable}
        bookables={bookables}
        getUrl={getUrl}
      />
      <Bookings bookable={bookable} />
    </main>
  );
}
