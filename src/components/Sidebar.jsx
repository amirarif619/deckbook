import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom'
//import './Sidebar.scss';

function Sidebar() {
  return (
    <Container fluid>
      <Row>
        <Col className="vh-100 position-sticky custom-sidebar" style={{ top: 1 }}>
          <Nav className="flex-column">
          <Nav.Link as={Link} to="/dashboard">Home</Nav.Link>
            <Nav.Link as={Link} to="/collection">My Collection</Nav.Link>
            <Nav.Link as={Link} to="/wishlist">My Wishlist</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
}

export default Sidebar;
