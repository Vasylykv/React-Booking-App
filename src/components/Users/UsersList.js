import { useState, useEffect } from 'react';
import Spinner from '../UI/Spinner';

import getData from '../../utils/api';

export default function UserList({ user, setUser }) {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData('http://localhost:3001/users')
      .then((users) => {
        // setUser(users[0]);
        setUsers(users);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
      });
  }, [setUser]);

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return (
      <p>
        <Spinner /> Loading users...
      </p>
    );
  }

  return (
    <>
      <ul className="users items-list-nav">
        {users.map((u, i) => (
          <li key={u.id} className={u.id === user.id ? 'selected' : null}>
            <button className="btn" onClick={() => setUser(u)}>
              {u.name}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
