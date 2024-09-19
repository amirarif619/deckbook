import DashboardLayout from "../components/DashboardLayout"
//import AddCardForm from '../components/AddCardForm'
//import CardItem from '../components/CardItem'
import { useLazyGetCardsQuery } from '../redux/cardApiSlice';
import { Row, Col, Card, Container,  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomCard from '../components/CustomCard'
import AddNewCard from "../components/AddNewCard";
import AddCardModal from '../components/AddCardModal'; 
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addCard } from '../redux/cardSlice'

function CollectionPage() {

  const dispatch = useDispatch();
  const cardList = useSelector(state => state.cards.cardList);

  const [trigger, { error, isLoading }] = useLazyGetCardsQuery();
  const [showModal, setShowModal] = useState(false) 

   // Function to open the modal
  const handleAddNewCardClick = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to add a card
  const handleAddCard = (card) => {
    dispatch(addCard(card)); // Dispatch the card to Redux
    setShowModal(false); 
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
                />
              </Col>
            ))}
          </Row>
        </Card>

         {/* AddCardModal */}
         <AddCardModal 
          show={showModal} 
          handleClose={handleCloseModal} 
          onAddCard={handleAddCard}
        />

      </DashboardLayout>
    </Container>
  );
}

export default CollectionPage;