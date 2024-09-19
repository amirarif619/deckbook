import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
//import './Sidebar.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css'; 
import { faHome, faBook, faHeart, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Sidebar() {
  return (
    <Container fluid className="custom-sidebar">
      <Nav className="flex-column text-white vh-100 p-4">
        <Nav.Link as={Link} to="/dashboard" className="sidebar-link">
          <FontAwesomeIcon icon={faHome} className="me-2 mt-4" /> Home
        </Nav.Link>
        <Nav.Link as={Link} to="/collection" className="sidebar-link">
          <FontAwesomeIcon icon={faBook} className="me-2 mt-4" /> My Collection
        </Nav.Link>
        <Nav.Link as={Link} to="/wishlist" className="sidebar-link">
          <FontAwesomeIcon icon={faHeart} className="me-2 mt-4" /> My Wishlist
        </Nav.Link>
        <Nav.Link as={Link} to="/about" className="sidebar-link">
          <FontAwesomeIcon icon={faInfoCircle} className="me-2 mt-4" /> About Us
        </Nav.Link>
      </Nav>
    </Container>
  );
}


export default Sidebar;
