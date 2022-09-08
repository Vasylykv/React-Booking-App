import WeekPicker from './WeekPicker';

export default function BookablesPage() {
  return (
    <main className="bookables-page">
      <p>Bookings!</p>
      <WeekPicker date={new Date()} />
    </main>
  );
}
