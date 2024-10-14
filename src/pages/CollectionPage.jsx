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
import './collectionpage.css';

function CollectionPage() {

  const dispatch = useDispatch();
  const cardList = useSelector(state => state.cards.cardList);

  const [{ error, isLoading }] = useLazyGetCardsQuery();

  const [showAddCardModal, setShowAddCardModal] = useState(false);  
  const [showCardInfoModal, setShowCardInfoModal] = useState(false); 
  const [selectedCard, setSelectedCard] = useState(null);


  
  const handleAddNewCardClick = () => {
    setShowAddCardModal(true);
  };
 
   const handleCloseAddCardModal = () => {
    setShowAddCardModal(false);
  };

  
  const handleAddCard = (card) => {
    dispatch(addCard(card)); 
    setShowAddCardModal(false); 
  };

  
  const handleCardClick = (card) => {
    setSelectedCard(card); 
    setShowCardInfoModal(true); 
  };

  
  const handleCloseCardInfoModal = () => {
    setShowCardInfoModal(false);
    setSelectedCard(null); 
  };

  if (isLoading) return <p>Loading cards...</p>;
  if (error) return <p>Error fetching cards: {error.message}</p>;

  const cardsPerPage = 12;
  const currentPage = 1; 
  const firstPageCards = cardList.slice(0, cardsPerPage - 1);

  return (
    
      <DashboardLayout>
    <Container className={`mt-4 ${showAddCardModal || showCardInfoModal ? 'blur-background' : ''}`}>

        <h2 className="text-center mb-4">My Collection</h2>

  
         
        <Card style={{ width: '100%', padding: '30px', margin: '20px 0' }}>
          <Row>
            
            {currentPage === 1 && (
              <Col xs={12} md={6} lg={3} className="mb-4">
                <AddNewCard onClick={handleAddNewCardClick}/>
              </Col>
            )}

           
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

         
         <AddCardModal 
          show={showAddCardModal} 
          handleClose={handleCloseAddCardModal} 
          onAddCard={handleAddCard}
        />

 
  <CardInfoModal 
          show={showCardInfoModal} 
          handleClose={handleCloseCardInfoModal}
          card={selectedCard} 
          canDelete={true}
        />

    </Container>
      </DashboardLayout>
  );
}

export default CollectionPage;