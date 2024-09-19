
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Miniview({ className, title, buttonText }) {
  return (
    <>
      <Container className={className}>
        <Card style={{ maxWidth: '800px', minHeight: '300px', width: '100%' }}>
          <Card.Body>
            <Row className="d-flex align-items-center mb-5">
              <Col>
                <Card.Title>{title}</Card.Title>
              </Col>
              <Col className="ms-auto" style={{ textAlign: 'right' }}>
                {' '}
                {/* ms-auto to push the button all the way to the right */}
                <Button variant="primary">{buttonText}</Button>
              </Col>
            </Row>

            <Row>
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>Inner Card 1</Card.Title>
                    <Card.Text>Details about the first inner card.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>Inner Card 1</Card.Title>
                    <Card.Text>Details about the first inner card.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>Inner Card 2</Card.Title>
                    <Card.Text>Details about the second inner card.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Miniview;
