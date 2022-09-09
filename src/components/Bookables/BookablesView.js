import { useReducer } from 'react';
import BookablesList from './BookablesList';
import BookableDetails from './BookableDetails';

import reducer from './reducer';

const initialState = {
  group: 'Rooms',
  bookableIndex: 0,
  bookables: [],
  isLoading: true,
  error: false,
};

export default function BookablesView(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const bookablesInGroup = state.bookables.filter(
    (b) => b.group === state.group
  );
  const bookable = bookablesInGroup[state.bookableIndex];

  return (
    <>
      <BookablesList state={state} dispatch={dispatch} />
      <BookableDetails bookable={bookable} />
    </>
  );
}
