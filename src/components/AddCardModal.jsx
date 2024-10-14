import { useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { useLazyGetCardsQuery } from '../redux/cardApiSlice'; 
import AddCardModalDetails from './AddCardModalDetails';

const AddCardModal = ({ show, handleClose }) => {
  const [searchTerm, setSearchTerm] = useState(''); 
  const [trigger, { data: searchResults, isLoading, error }] = useLazyGetCardsQuery(); 
  const [selectedCard, setSelectedCard] = useState(null); 
  const [showCardDetails, setShowCardDetails] = useState(false); 
  
  const handleSearch = () => {
    trigger(searchTerm); 
  };

  const handleSelectCard = (card) => {
    setSelectedCard(card); 
    setShowCardDetails(true); 
  };

  const handleCloseCardDetails = () => {
    setShowCardDetails(false); 
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Form className="mb-4">
            <Form.Control 
              type="text" 
              placeholder="Search for a card..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={handleSearch} className="mt-2">Search</Button>
          </Form>

        
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}

          <Row>
            {searchResults?.data?.slice(0, 36).map(card => (
              <Col key={card.id} xs={12} md={4} lg={2} className="mb-4">
                <div className="card-img-wrapper text-center">
                  <img src={card.images.small} alt={card.name} style={{ width: '100%' }} />
                  <Button 
                    className="mt-2" 
                    onClick={() => handleSelectCard(card)} 
                  >
                    Select Card
                  </Button>
                </div>
              </Col>
            ))}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

     
      {selectedCard && (
        <AddCardModalDetails
          show={showCardDetails}
          handleClose={handleCloseCardDetails}
          handleCloseParentModal={handleClose} 
          card={selectedCard}
        />
      )}
    </>
  );
};

export default AddCardModal;
