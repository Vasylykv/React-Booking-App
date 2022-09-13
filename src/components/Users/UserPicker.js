import { useState, useEffect, useContext } from 'react';
import UserContext from './UserContext';
import { UserSetContext } from './UserContext';
import Spinner from '../UI/Spinner';

export default function UserPicker() {
  const [users, setUsers] = useState(null);
  const user = useContext(UserContext);
  const setUser = useContext(UserSetContext);

  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then((resp) => resp.json())
      .then((data) => {
        setUsers(data);
        setUser(data[0]);
      });
  }, [setUser]);

  const handleSelect = (e) => {
    const selectedId = parseInt(e.target.value, 10);
    const selectedUser = users.find((u) => u.id === selectedId);

    setUser(selectedUser);
  };

  if (users === null) {
    return <Spinner />;
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
