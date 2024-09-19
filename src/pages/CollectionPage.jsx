import DashboardLayout from "../components/DashboardLayout"
import { useLazyGetCardsQuery } from '../redux/cardApiSlice';
import { Row, Col, Card, Container,  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomCard from '../components/CustomCard'
import AddNewCard from "../components/AddNewCard";
import AddCardModal from '../components/AddCardModal'; 
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addCard } from '../redux/cardSlice'
import CardInfoModal from '../components/CardInfoModal';

function CollectionPage() {

  const dispatch = useDispatch();
  const cardList = useSelector(state => state.cards.cardList);

  const [trigger, { error, isLoading }] = useLazyGetCardsQuery();

  const [showAddCardModal, setShowAddCardModal] = useState(false);  // Renamed for AddCardModal
  const [showCardInfoModal, setShowCardInfoModal] = useState(false); // New state for CardInfoModal
  const [selectedCard, setSelectedCard] = useState(null);


  // Function to open the AddCard modal
  const handleAddNewCardClick = () => {
    setShowAddCardModal(true);
  };
   // Function to open the modal
   const handleCloseAddCardModal = () => {
    setShowAddCardModal(false);
  };

  // Function to add a card
  const handleAddCard = (card) => {
    dispatch(addCard(card)); // Dispatch the card to Redux
    setShowAddCardModal(false); 
  };

  // Function to open CardInfoModal when clicking on a card
  const handleCardClick = (card) => {
    setSelectedCard(card); // Set the clicked card as the selected card
    setShowCardInfoModal(true); // Show CardInfoModal
  };

  // Function to close the CardInfoModal
  const handleCloseCardInfoModal = () => {
    setShowCardInfoModal(false);
    setSelectedCard(null); // Clear selected card when closing
  };

  if (isLoading) return <p>Loading cards...</p>;
  if (error) return <p>Error fetching cards: {error.message}</p>;

  const cardsPerPage = 12;
  const currentPage = 1; // Simulating we're on the first page for now
  const firstPageCards = cardList.slice(0, cardsPerPage - 1);

  return (
    <Container className="mt-4">
        <DashboardLayout>
        <h2 className="text-center mb-4">My Collection</h2>

      

         {/* Card Grid Layout */}
        <Card style={{ width: '100%', padding: '30px', margin: '20px 0' }}>
          <Row>
            {/* AddNewCard Placeholder - Display first only on the first page */}
            {currentPage === 1 && (
              <Col xs={12} md={6} lg={3} className="mb-4">
                <AddNewCard onClick={handleAddNewCardClick}/>
              </Col>
            )}

            {/* Render the rest of the cards */}
            {firstPageCards?.map(card => (
              <Col key={card.id} xs={12} md={6} lg={3} className="mb-4">
                <CustomCard
                  imageUrl={card.images.small}
                  title={card.name}
                  description={`${card.set.name}`}
                  onClick={() => handleCardClick(card)}
                />
              </Col>
            ))}
          </Row>
        </Card>

         {/* AddCardModal */}
         <AddCardModal 
          show={showAddCardModal} 
          handleClose={handleCloseAddCardModal} 
          onAddCard={handleAddCard}
        />

  {/* CardInfoModal */}
  <CardInfoModal 
          show={showCardInfoModal} 
          handleClose={handleCloseCardInfoModal}
          card={selectedCard} // Pass the selected card to the modal
          canDelete={true}
        />

      </DashboardLayout>
    </Container>
  );
}

export default CollectionPage;