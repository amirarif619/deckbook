import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCard ,  } from '../redux/cardSlice'; // Redux slice to add the card

const AddCardModalDetails = ({ show, handleClose, card, handleCloseParentModal, isEditMode }) => {
  const [psaGrade, setPsaGrade] = useState('Ungraded'); // Local state for PSA Grade
  const [notes, setNotes] = useState(''); // Local state for custom notes
  const [cardAdded, setCardAdded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditMode && card) {
      setPsaGrade(card.psaGrade || 'Ungraded'); // Prefill the PSA grade
      setNotes(card.notes || ''); // Prefill the notes
    }
  }, [isEditMode, card]);

  const handleAddCard = () => {
    const newCard = {
      ...card,
      psaGrade, // Add PSA grade
      notes,    // Add custom notes
    };
    
    dispatch(addCard(newCard)); // Dispatch the card to Redux with PSA grade and notes
    setCardAdded(true);; // Close the modal after adding


  // Reset the state and close both modals after a short delay
  setTimeout(() => {
    setCardAdded(false);
    setNotes(''); // Reset notes field
    setPsaGrade('Ungraded'); // Reset PSA grade field
    handleClose(); // Close the current modal
    handleCloseParentModal(); // Close the parent modal (AddCardModal)
  }, 800); // Show the message for 0.8 seconds before closing the modal
};

// Reset the notes and PSA grade when the modal is closed
const resetModalState = () => {
  setNotes(''); // Reset notes
  setPsaGrade('Ungraded'); // Reset PSA grade to default
  handleClose(); // Call the parent function to close the modal
};

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{cardAdded ? 'Card Added!' : 'Card Details'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {cardAdded ? (
          <h3 className="text-center">Card Added Successfully!</h3>
        ) : (
        <Row>
          {/* Left side: Card Image */}
          <Col xs={12} md={6}>
            <img
              src={card?.images?.large}
              alt={card?.name}
              style={{ width: '100%' }}
            />
          </Col>

          {/* Right side: Card Details */}
          <Col xs={12} md={6}>
            <h3 className="mt-3 mb-3">{card?.name}</h3>
            <Form.Group className="mt-3">
              <Form.Label>Set</Form.Label>
              <Form.Control type="text" readOnly value={card?.set?.name || ''} />
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label>Artist</Form.Label>
              <Form.Control type="text" readOnly value={card?.artist || ''} />
            </Form.Group>

            {/* PSA Grade Dropdown */}
            <Form.Group className="mt-3">
              <Form.Label>PSA Grade</Form.Label>
              <Form.Control 
                as="select" 
                value={psaGrade} 
                onChange={(e) => setPsaGrade(e.target.value)}>
                <option value="Ungraded">Ungraded</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                {/* Add more PSA grades as needed */}
              </Form.Control>
            </Form.Group>

            {/* Notes Textarea */}
            <Form.Group className="mt-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3} 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)} 
              />
            </Form.Group>
          </Col>
        </Row>
        )}
      </Modal.Body>
      <Modal.Footer>
        {!cardAdded && (
          <>
            <Button variant="secondary" onClick={resetModalState}>Go Back</Button>
            <Button variant="primary" onClick={handleAddCard}>Add Card</Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default AddCardModalDetails;
