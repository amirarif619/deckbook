import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faD } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon
import { logout } from '../redux/userSlice'; // Import logout action
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function MainNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action to clear user from Redux store
    navigate('/login'); // Redirect to login page after logout
  };


    return (
      <Navbar bg="dark" expand="lg">
        <div className="d-flex align-items-center "> {/* Flexbox for alignment */}
          <FontAwesomeIcon icon={faD} className="mr-2 p-2" /> {/* Add some margin */}
          <Navbar.Brand as={Link} to="/" className=" text-light">DeckBook</Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
          <Nav.Link href="#" className="text-light">User</Nav.Link> {/* Make User white */}
          <Nav.Link onClick={handleLogout} href="#" className="text-light">Logout</Nav.Link> {/* Make Logout white */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

export default MainNavbar;
