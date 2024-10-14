import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faD } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../redux/userSlice'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function MainNavbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  const handleLogout = () => {
    dispatch(logout()); 
    localStorage.removeItem('user'); 
    navigate('/login'); 
  };


    return (
      <Navbar bg="dark" expand="lg">
        <div className="d-flex align-items-center "> 
          <FontAwesomeIcon icon={faD} className="mr-2 p-2" /> 
          <Navbar.Brand as={Link} to="/" className=" text-light">DeckBook</Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
          <Nav.Link href="#" className="text-light">User</Nav.Link> 
          <Nav.Link onClick={handleLogout} href="#" className="text-light">Logout</Nav.Link> 
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

export default MainNavbar;
