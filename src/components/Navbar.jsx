import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faD } from '@fortawesome/free-solid-svg-icons'; // Import the specific icon


function MainNavbar() {
    return (
      <Navbar bg="dark" expand="lg">
        <div className="d-flex align-items-center border-bottom"> {/* Flexbox for alignment */}
          <FontAwesomeIcon icon={faD} className="mr-2 p-2" /> {/* Add some margin */}
          <Navbar.Brand as={Link} to="/">DeckBook</Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="#">User</Nav.Link>
            <Nav.Link href="#">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }

export default MainNavbar;
