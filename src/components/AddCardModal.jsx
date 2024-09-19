import { useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { useLazyGetCardsQuery } from '../redux/cardApiSlice'; 
import AddCardModalDetails from './AddCardModalDetails';

const AddCardModal = ({ show, handleClose }) => {
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [trigger, { data: searchResults, isLoading, error }] = useLazyGetCardsQuery(); // API search query
  const [selectedCard, setSelectedCard] = useState(null); // Track the selected card
  const [showCardDetails, setShowCardDetails] = useState(false); // Track the second modal state
  
  const handleSearch = () => {
    trigger(searchTerm); // Trigger search when clicking "Search"
  };

  const handleSelectCard = (card) => {
    setSelectedCard(card); // Set the selected card for the details modal
    setShowCardDetails(true); // Show the second modal for card details
  };

  const handleCloseCardDetails = () => {
    setShowCardDetails(false); // Close the second modal
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Search Bar */}
          <Form className="mb-4">
            <Form.Control 
              type="text" 
              placeholder="Search for a card..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={handleSearch} className="mt-2">Search</Button>
          </Form>

          {/* Display search results in a 6x6 grid */}
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}

          <Row>
            {searchResults?.data?.slice(0, 36).map(card => (
              <Col key={card.id} xs={12} md={4} lg={2} className="mb-4">
                <div className="card-img-wrapper text-center">
                  <img src={card.images.small} alt={card.name} style={{ width: '100%' }} />
                  <Button 
                    className="mt-2" 
                    onClick={() => handleSelectCard(card)} // Handle selecting the card for details
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

      {/* Second Modal for Card Details */}
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
