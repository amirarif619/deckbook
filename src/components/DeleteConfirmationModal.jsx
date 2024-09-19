import { Modal, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

const DeleteConfirmationModal = ({ show, handleClose, handleConfirm }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      
      <Modal.Body className="d-flex flex-column align-items-center">
        <Image src="/assets/sadpika.png"  style={{ width: '300px', height: 'auto' }} />
        <p>Are you sure you want to delete this card?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleConfirm}>
          Delete
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};


export default DeleteConfirmationModal;