import { Card } from 'react-bootstrap';
import './CustomCard.css'; 

function CustomCard({ imageUrl, title, description }) {
  return (
    <div className="custom-card-container h-100">
      <Card className="h-100 box-shadow mx-auto my-1" style={{ width: '12rem' }}>
        <Card.Img variant="top" src={imageUrl} alt={title} />
        <Card.Body className="d-flex flex-column" >
          <Card.Title>{title}</Card.Title>
          <hr />
          <Card.Text className="mt-auto">{description}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default CustomCard;
