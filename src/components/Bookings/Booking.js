export default function Booking({ booking, bookable }) {
  const { title, date, session, notes } = booking;

  return (
    <div className="booking-details-fields">
      <label htmlFor="">Title</label>
      <p>{title}</p>
      <label htmlFor="">
        <p>{bookable.title}</p>
      </label>
      <label htmlFor="">Booking Date</label>
      <p>{new Date(date).toDateString()}</p>

      <label htmlFor="">Session</label>
      <p>{session}</p>

      {notes && (
        <>
          <label htmlFor="">Notes</label>
          <p>{notes}</p>
        </>
      )}
    </div>
  );
}
