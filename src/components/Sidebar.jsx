import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import './Sidebar.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

function Sidebar() {
  return (
    <Container  fluid className="custom-sidebar">
      <Nav  className="flex-column text-center text-white vh-100" >
        <Nav.Link as={Link} to="/dashboard">Home</Nav.Link>
        <Nav.Link as={Link} to="/collection">My Collection</Nav.Link>
        <Nav.Link as={Link} to="/wishlist">My Wishlist</Nav.Link>
        <Nav.Link as={Link} to="/about">About Us</Nav.Link>
      </Nav>
    </Container>
  );
}

export default Sidebar;
