
import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateCard } from '../redux/cardSlice'; // Action to update card in Redux

const EditCardModal = ({ show, handleClose, card, onSave }) => {
  const [psaGrade, setPsaGrade] = useState(card?.psaGrade || 'Ungraded');
  const [notes, setNotes] = useState(card?.notes || '');
  const dispatch = useDispatch();

  // Pre-fill form when the modal is opened with the card's data
  useEffect(() => {
    if (card) {
      setPsaGrade(card.psaGrade || 'Ungraded');
      setNotes(card.notes || '');
    }
  }, [card]);

  // Handle form submission to update the card
  const handleSaveChanges = () => {
    const updatedCard = {
      ...card,
      psaGrade,
      notes,
    
    };
    
    onSave({ ...card, ...updatedCard }); // Update the local state in the parent

    // Dispatch action to update the card in Redux, sending the id and updates
    dispatch(updateCard({ id: card.id, updates: updatedCard }));
  
    handleClose(); // Close the modal after saving
  };
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Card Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* PSA Grade Dropdown */}
          <Form.Group controlId="psaGrade">
            <Form.Label>PSA Grade</Form.Label>
            <Form.Control
              as="select"
              value={psaGrade}
              onChange={(e) => setPsaGrade(e.target.value)}
            >
              <option value="Ungraded">Ungraded</option>
              {[...Array(10).keys()].map(num => (
                <option key={num + 1} value={num + 1}>{num + 1}</option>
              ))}
            </Form.Control>
          </Form.Group>

          {/* Notes Textarea */}
          <Form.Group controlId="notes" className="mt-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCardModal;
