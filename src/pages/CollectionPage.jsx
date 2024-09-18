import DashboardLayout from "../components/DashboardLayout"
import AddCardForm from '../components/AddCardForm'
import CardItem from '../components/CardItem'
import { useLazyGetCardsQuery } from '../redux/cardApiSlice';
import { Row, Col, Card, Button, Container, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function CollectionPage() {
  const [trigger, { data: cardList, error, isLoading }] = useLazyGetCardsQuery();

  const handleSearch = () => {
    trigger(); // Trigger the API call when needed (you can hook this up with a search field later)
  };

  if (isLoading) return <p>Loading cards...</p>;
  if (error) return <p>Error fetching cards: {error.message}</p>;

  return (
    <Container className="mt-4">
        <DashboardLayout>
        <h2 className="text-center mb-4">My Pokémon Card Collection</h2>

        {/* Search Input (Optional, for future implementation) */}
        <Form className="mb-4">
          <Form.Control type="text" placeholder="Search for a card..." />
          <Button onClick={handleSearch} className="mt-2">Search</Button>
        </Form>

        {/* Card Grid Layout */}
        <Row>
          {cardList?.data?.map(card => (
            <Col key={card.id} xs={12} md={6} lg={3} className="mb-4">
              <Card className="h-100">
                <Card.Img variant="top" src={card.images.small} alt={card.name} />
                <Card.Body>
                  <Card.Title>{card.name}</Card.Title>
                  <Card.Text>Collection: {card.set.name}</Card.Text>
                  <Button variant="primary">View Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
    </DashboardLayout>
      </Container>
  );
}

export default CollectionPage;