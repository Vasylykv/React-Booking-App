import { useState } from 'react';
import BookablesList from '../Bookables/BookablesList';
import Bookings from './Bookings';
// import WeekPicker from './WeekPicker';

export default function BookablesPage() {
  const [bookable, setBookable] = useState(null);

  return (
    <main className="bookables-page">
      <BookablesList bookable={bookable} setBookable={setBookable} />
      <Bookings bookable={bookable} />
    </main>
  );
}
