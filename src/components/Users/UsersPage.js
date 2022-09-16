import { useState } from 'react';
import { useUser } from './UserContext';

import UserList from './UsersList';
import UserDetails from './UserDetails';

export default function UserPage() {
  const [user, setUser] = useState(null);

  const [loggedInUser] = useUser();

  const currentUser = user || loggedInUser;

  return (
    <main className="bookables-page">
      <UserList user={currentUser} setUser={setUser} />
      <UserDetails user={currentUser} />
    </main>
  );
}
