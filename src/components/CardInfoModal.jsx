import { Modal, Row, Col, Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { removeCard, updateCard } from '../redux/cardSlice';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import EditCardModal from './EditCardModal';

const CardInfoModal = ({ show, handleClose, card, canDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [localCard, setLocalCard] = useState(card); 
  const dispatch = useDispatch();

 
  useEffect(() => {
    setLocalCard(card);
  }, [card]);

  const handleDelete = () => {
    if (localCard?.id) {
      dispatch(removeCard(localCard.id)); 
      handleClose(); 
      setShowDeleteConfirm(false);
    }
  };

  const openDeleteConfirm = () => setShowDeleteConfirm(true);
  const closeDeleteConfirm = () => setShowDeleteConfirm(false);

  const openEditModal = () => setShowEditModal(true); 
  const closeEditModal = () => setShowEditModal(false); 

  const handleSaveEdit = (newCardData) => {
    
    setLocalCard(newCardData);

  
    dispatch(updateCard({
      id: localCard.id, 
      updates: newCardData,
    }));

    closeEditModal(); 
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" centered>
        <Modal.Body>
          <Row>
            
            <Col xs={12} md={6}>
              <img
                src={localCard?.images?.large}
                alt={localCard?.name}
                style={{ width: '100%' }}
              />
            </Col>
      
            <Col xs={12} md={6}>
              <h3 className='mt-3 mb-3'>{localCard?.name}</h3>
              <ListGroup>
                <ListGroup.Item><Button variant="dark">Set</Button>   {localCard?.set?.series}</ListGroup.Item>
                <ListGroup.Item><Button variant="dark">Artist</Button>   {localCard?.artist}</ListGroup.Item>
                <ListGroup.Item><Button variant="dark">Release Date</Button>   {localCard?.set?.releaseDate}</ListGroup.Item>
                <ListGroup.Item><Button variant="dark">Rarity</Button>   {localCard?.rarity}</ListGroup.Item>
                <ListGroup.Item><Button variant="dark">PSA Grade</Button>   {localCard?.psaGrade || 'Ungraded'}</ListGroup.Item>
                <ListGroup.Item><Button variant="dark">Notes</Button>  {localCard?.notes || 'No notes available'}</ListGroup.Item>
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

          <Button variant="primary" onClick={openEditModal}>
            Edit Card
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

     
      <DeleteConfirmationModal
        show={showDeleteConfirm}
        handleClose={closeDeleteConfirm}
        handleConfirm={handleDelete} 
      />

    
      <EditCardModal
        show={showEditModal}
        handleClose={closeEditModal}
        card={localCard} 
        onSave={handleSaveEdit} 
      />
    </>
  );
};

export default CardInfoModal;
