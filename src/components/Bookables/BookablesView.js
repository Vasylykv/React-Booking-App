import { useState, useCallback } from 'react';
import BookablesList from './BookablesList';
import BookableDetails from './BookableDetails';

export default function BookablesView(props) {
  const [bookable, setBookable] = useState();

  const updatedBookable = useCallback((selected) => {
    if (selected) {
      selected.lastShown = Date.now();
      setBookable(selected);
    }
  }, []);

  return (
    <>
      <BookablesList bookable={bookable} setBookable={updatedBookable} />
      <BookableDetails bookable={bookable} />
    </>
  );
}
