import data from '../../static.json';
const { users } = data;

export default function UserPicker() {
  return (
    <select>
      {users.map((u, i) => (
        <option key={u.id} value={u.name}>
          {u.name}
        </option>
      ))}
    </select>
  );
}
