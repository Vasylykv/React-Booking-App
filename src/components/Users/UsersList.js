import { useQuery } from 'react-query';
import getData from '../../utils/api';
import Spinner from '../UI/Spinner';

export default function UserList({ user, setUser }) {
  const {
    data: users = [],
    error,
    status,
  } = useQuery('users', () => getData('http://localhost:3001/users'));

  if (status === 'error') {
    return <p>{error.message}</p>;
  }

  if (status === 'loading') {
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
          <li key={u.id} className={u.id === user?.id ? 'selected' : null}>
            <button className="btn" onClick={() => setUser(u)}>
              {u.name}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
