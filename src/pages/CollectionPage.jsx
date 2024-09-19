import DashboardLayout from "../components/DashboardLayout"
//import AddCardForm from '../components/AddCardForm'
//import CardItem from '../components/CardItem'
import { useLazyGetCardsQuery } from '../redux/cardApiSlice';
import { Row, Col, Card, Button, Container, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomCard from '../components/CustomCard'
import AddNewCard from "../components/AddNewCard";

function CollectionPage() {
  const [trigger, { data: cardList, error, isLoading }] = useLazyGetCardsQuery();

  const handleSearch = () => {
    trigger(); // Trigger the API call when needed (you can hook this up with a search field later)
  };

  if (isLoading) return <p>Loading cards...</p>;
  if (error) return <p>Error fetching cards: {error.message}</p>;

  const cardsPerPage = 12;
  const currentPage = 1; // Simulating we're on the first page for now
  const firstPageCards = cardList?.data?.slice(0, cardsPerPage - 1);

  return (
    <Container className="mt-4">
        <DashboardLayout>
        <h2 className="text-center mb-4">My Pokémon Card Collection</h2>

        {/* Search Input (for future implementation) */}
        <Form className="mb-4">
          <Form.Control type="text" placeholder="Search for a card..." />
          <Button onClick={handleSearch} className="mt-2">Search</Button>
        </Form>

         {/* Card Grid Layout */}
        <Card style={{ width: '100%', padding: '30px', margin: '20px 0' }}>
          <Row>
            {/* AddNewCard Placeholder - Display first only on the first page */}
            {currentPage === 1 && (
              <Col xs={12} md={6} lg={3} className="mb-4">
                <AddNewCard />
              </Col>
            )}

            {/* Render the rest of the cards */}
            {firstPageCards?.map(card => (
              <Col key={card.id} xs={12} md={6} lg={3} className="mb-4">
                <CustomCard
                  imageUrl={card.images.small}
                  title={card.name}
                  description={` ${card.set.name}`}
                />
              </Col>
            ))}
          </Row>
        </Card>
      </DashboardLayout>
    </Container>
  );
}

export default CollectionPage;