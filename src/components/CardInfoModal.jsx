import { Modal, Row, Col, Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { removeCard } from '../redux/cardSlice'
import { useDispatch } from 'react-redux'

import { useState } from 'react';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const CardInfoModal = ({ show, handleClose, card, canDelete }) => {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); 
   const dispatch = useDispatch();

   const handleDelete = () => {
    if (card?.id) {
      dispatch(removeCard(card.id)); // Ensure card.id exists
      handleClose(); // Close the modal after deletion
      setShowDeleteConfirm(false)
    }
  };

  const openDeleteConfirm = () => setShowDeleteConfirm(true);
  
  // Close the confirmation modal
  const closeDeleteConfirm = () => setShowDeleteConfirm(false);


  return (
    <>
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{card?.name || 'Card Info'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
            <h3 className='mt-3 mb-3'>{card?.name}</h3>
            <ListGroup >
      <ListGroup.Item><Button variant="success">Set </Button> {card?.set?.series}</ListGroup.Item>
      <ListGroup.Item><Button variant="primary">Artist </Button> {card?.artist}</ListGroup.Item>
      <ListGroup.Item><Button variant="warning">Release Date </Button> {card?.set?.releaseDate}</ListGroup.Item>
      <ListGroup.Item><Button variant="info">Rarity </Button> {card?.rarity}</ListGroup.Item>
    </ListGroup>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
    {canDelete && (
              <Button variant="danger" onClick={openDeleteConfirm}>
                Delete Card
              </Button>
            )}
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>

             {/* Confirmation Modal */}
      <DeleteConfirmationModal
        show={showDeleteConfirm}
        handleClose={closeDeleteConfirm}
        handleConfirm={handleDelete} // Trigger actual delete on confirmation
      />

    </>
  );
};

export default CardInfoModal;
