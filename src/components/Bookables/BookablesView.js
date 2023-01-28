import { Link, useParams } from 'react-router-dom';

import { useQuery } from 'react-query';
import getData from '../../utils/api';

import PageSpinner from '../UI/PageSpinner';
import { FaPlus } from 'react-icons/fa';

import BookablesList from './BookablesList';
import BookableDetails from './BookableDetails';

export default function BookablesView(props) {
  const {
    data: bookables = [],
    error,
    status,
  } = useQuery('bookables', () =>
    getData(`${process.env.REACT_APP_BASE_URL}/bookables`)
  );

  const { id } = useParams(); // returns values as string type

  const bookable =
    bookables.find((bookable) => bookable.id === parseInt(id, 10)) ||
    bookables[0];

  if (status === 'error') {
    return <p>{error.message}</p>;
  }

  if (status === 'loading') {
    return <PageSpinner />;
  }

  return (
    <main className="bookables-page">
      <div>
        <BookablesList
          bookable={bookable}
          bookables={bookables}
          getUrl={(id) => `/bookables/${id}`}
        />
        <p className="controls">
          <Link to="/bookables/new" replace className="btn">
            <FaPlus />
            <span>New</span>
          </Link>
        </p>
      </div>
      <BookableDetails bookable={bookable} />
    </main>
  );
}
