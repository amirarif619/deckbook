
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function Miniview({ className, title, buttonText, recentCards = [] }) {
  return (
    <Card className={className} style={{ width: '100%', padding: '5px' }}>
    <Card.Body>
      <Row className="d-flex align-items-center mb-3">
        <Col>
        <h4 className="card-header">{title}</h4>
        </Col>
        <Col className="ms-auto text-end" >
          <Button variant="danger">{buttonText}</Button>
        </Col>
      </Row>

   
      <Row className="g-4">
      {recentCards.length > 0 ? (
            recentCards.map((card, index) => (
              <Col key={index} md={4} >
                <Card style={{ width: '90%' }}>
                  <Card.Img variant="top" src={card.images.large} /> 
                </Card>
              </Col>
            ))
          ) : (
            <p>No recent cards available.</p> 
          )}
        </Row>
      </Card.Body>
    </Card>
  );
}
export default Miniview;
