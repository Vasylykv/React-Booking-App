import { shortISO } from './date-wrangler';

export default function getData(url) {
  return fetch(url).then((resp) => {
    if (!resp.ok) {
      throw Error('There was a problem fetching data.');
    }

    return resp.json();
  });
}

export function getBookings(bookableId, startDate, endDate) {
  const start = shortISO(startDate); // '2022-09-11'
  const end = shortISO(endDate); // '2022-09-15'

  // const urlRoot = 'http://localhost:3001/bookings';
  const urlRoot = `${process.env.REACT_APP_BASE_URL}/bookings`;

  const query = `bookableId=${bookableId}&date_gte=${start}&date_lte=${end}`;

  return getData(`${urlRoot}?${query}`);
}

export function createItem(url, item) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(item),
  }).then((r) => {
    if (!r.ok) {
      throw new Error(`There was a problem creating the item`);
    }
    return r.json();
  });
}

export function editItem(url, item) {
  return fetch(url, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(item),
  }).then((r) => {
    if (!r.ok) {
      throw new Error('There was a problem updating the item!');
    }
    return r.json();
  });
}

export function deleteItem(url) {
  return fetch(url, {
    method: 'DELETE',
    headers: { 'Content-type': 'application/json' },
  }).then((r) => {
    if (!r.ok) {
      throw new Error('There was a problem deleting the item!');
    }
    return r.json();
  });
}
