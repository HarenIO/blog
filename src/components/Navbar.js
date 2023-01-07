import { Link, useLocation } from 'react-router-dom';
import './Navbar.scss';

function Navbar() {
  const location = useLocation();

  return (
    <nav>
      <p>Logo</p>
      <ul>
        <li>
          <Link
            to="/"
            className={location.pathname === '/' ? 'current' : ''}>
            All Posts
          </Link>
        </li>
        <li>
          <Link
            to="/create"
            className={location.pathname === '/create' ? 'current' : ''}>
            New Post
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

