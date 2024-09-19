import { Card } from 'react-bootstrap';
import './AddNewCard.css';

const AddNewCard = ({ onClick }) => {
  return (
    <Card 
      className="h-100 add-new-card" 
      onClick={onClick}
    >
      <Card.Body className="d-flex flex-column justify-content-center align-items-center">
        <h3 className="text-center">+ Add New Card</h3>
      </Card.Body>
    </Card>
  );
};

export default AddNewCard;
