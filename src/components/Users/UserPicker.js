import { useEffect } from 'react';
import { useUser } from './UserContext';

import { useQuery } from 'react-query';
import getData from '../../utils/api';

import Spinner from '../UI/Spinner';

export default function UserPicker() {
  const [user, setUser] = useUser();

  const { data: users = [], status } = useQuery('users', () =>
    getData('http://localhost:3001/users')
  );

  useEffect(() => {
    setUser(users[0]);
  }, [users, setUser]);

  const handleSelect = (e) => {
    const selectedId = parseInt(e.target.value, 10);
    const selectedUser = users.find((u) => u.id === selectedId);

    setUser(selectedUser);
  };

  if (status === 'loading') {
    return <Spinner />;
  }

  if (status === 'error') {
    return <span>Error!</span>;
  }

  return (
    <select className="user-picker" onChange={handleSelect} value={user?.id}>
      {users.map((u, i) => (
        <option key={u.id} value={u.id}>
          {u.name}
        </option>
      ))}
    </select>
  );
}
