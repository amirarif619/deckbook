import { Modal, Row, Col, Button } from 'react-bootstrap';

const CardInfoModal = ({ show, handleClose, card }) => {
  return (
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
            <h5>Name: {card?.name}</h5>
            <p>Artist: {card?.artist}</p>
            <p>Release Date: {card?.set?.releaseDate}</p>
            <p>Rarity: {card?.rarity}</p>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CardInfoModal;
