import { useState, useContext } from 'react';

import UserList from './UsersList';
import UserDetails from './UserDetails';

import UserContext from './UserContext';

export default function UserPage() {
  const [user, setUser] = useState(null);

  const loggedInUser = useContext(UserContext);

  const currentUser = user || loggedInUser;

  return (
    <main className="bookables-page">
      <UserList user={currentUser} setUser={setUser} />
      <UserDetails user={currentUser} />
    </main>
  );
}
