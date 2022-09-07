import { useReducer } from 'react';
import data from '../../static.json';
import { FaArrowRight } from 'react-icons/fa';
import reducer from './reducer';

const { bookables, sessions, days } = data;

const initialState = {
  group: 'Rooms',
  bookableIndex: 0,
  hasDetails: true,
  bookables,
};

export default function BookablesList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { group, bookableIndex, bookables, hasDetails } = state;

  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const bookable = bookablesInGroup[bookableIndex];
  const groups = [...new Set(bookables.map((b) => b.group))];

  const nextBookable = () => {
    dispatch({ type: 'NEXT_BOOKABLE' });
  };

  const changeBookable = (selectedIndex) => {
    dispatch({
      type: 'SET_BOOKABLE',
      payload: selectedIndex,
    });
  };

  const toggleDetails = () => {
    dispatch({ type: 'TOGGLE_HAS_DETAILS' });
  };

  const changeGroup = (e) => {
    dispatch({
      type: 'SET_GROUP',
      payload: e.target.value,
    });
  };

  return (
    <>
      <div>
        <select value={group} onChange={changeGroup}>
          {groups.map((g) => (
            <option value={g} key={g}>
              {g}
            </option>
          ))}
        </select>

        <ul className="bookables items-list-nav">
          {bookablesInGroup.map((b, i) => (
            <li
              key={b.title}
              className={i === bookableIndex ? 'selected' : null}
            >
              <button className="btn" onClick={() => changeBookable(i)}>
                {b.title}
              </button>
            </li>
          ))}
        </ul>
        <p>
          <button className="btn" onClick={nextBookable} autoFocus>
            <FaArrowRight />
            <span>Next</span>
          </button>
        </p>
      </div>
      {bookable && (
        <div className="bookable-details">
          <div className="item">
            <div className="item-header">
              <h2>{bookable.title}</h2>
              <span className="controls">
                <label htmlFor="">
                  <input
                    type="checkbox"
                    checked={hasDetails}
                    onChange={toggleDetails}
                  />
                  Show Details
                </label>
              </span>
            </div>
            <p>{bookable.notes}</p>

            {hasDetails && (
              <div className="item-details">
                <h3>Availability</h3>
                <div className="bookable-avaibility">
                  <ul>
                    {bookable.days.sort().map((d) => (
                      <li key={d}>{days[d]}</li>
                    ))}
                  </ul>
                  <ul>
                    {bookable.sessions.map((s) => (
                      <li key={s}>{sessions[s]}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
