import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaCalendarAlt, FaDoorOpen, FaUsers } from 'react-icons/fa';

import BookingsPage from './Bookings/BookingsPage';
import BookablesPage from './Bookables/BookablesPage';
import UsersPage from './Users/UsersPage';
import UserPicker from './Users/UserPicker.js';

import '../App.css';

export default function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <nav>
            <li>
              <Link to="/bookings" className="btn btn-header">
                <FaCalendarAlt />
                <span>Bookings</span>
              </Link>
            </li>
            <li>
              <Link to="/bookables" className="btn btn-header">
                <FaDoorOpen />
                <span>Bookables</span>
              </Link>
            </li>
            <li>
              <Link to="/users" className="btn btn-header">
                <FaUsers />
                <span>Users</span>
              </Link>
            </li>
          </nav>
          <UserPicker />
        </header>

        <Routes>
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/bookables" element={<BookablesPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </div>
    </Router>
  );
}
