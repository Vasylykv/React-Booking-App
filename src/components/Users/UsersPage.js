import { useState } from 'react';

import UserList from './UsersList';
import UserDetails from './UserDetails';

export default function BookablesPage() {
  const [user, setUser] = useState();

  return (
    <main className="bookables-page">
      <UserList user={user} setUser={setUser} />
      <UserDetails user={user} />
    </main>
  );
}
