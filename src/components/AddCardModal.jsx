import { useState } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { useLazyGetCardsQuery } from '../redux/cardApiSlice'; // Assuming your RTK Query is set up
import { useDispatch } from 'react-redux'
import { addCard } from '../redux/cardSlice'

const AddCardModal = ({ show, handleClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [trigger, { data: searchResults, isLoading, error }] = useLazyGetCardsQuery();
  const [cardAdded, setCardAdded] = useState(false);
  const dispatch = useDispatch()
  
  const handleSearch = () => {
    trigger(searchTerm); // Trigger search when clicking "Search"
  };

  const handleAddCard = (card) => {
    dispatch(addCard(card)); // Dispatch the action to add the card to the collection
    setCardAdded(true); // Show the "Card Added!" message
    setTimeout(() => {
      setCardAdded(false); // Reset the state after the message
      handleClose(); // Close the modal after 2 seconds
    }, 800); // Show the message for 2 seconds before closing the modal
  };
  

  return (
    <Modal show={show} onHide={handleClose} size="xl" centered>
      <Modal.Header closeButton>
        <Modal.Title>Add a New Card</Modal.Title>
      </Modal.Header>
      <Modal.Body>
         {/* Display "Card Added!" message if card was added */}
         {cardAdded ? (
          <h3 className="text-center">Card Added!</h3>
        ) : (
            <>
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
                  onClick={() => handleAddCard(card)}
                >
                  Add Card
                </Button>
              </div>
            </Col>
          ))}
        </Row>
        </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddCardModal;
