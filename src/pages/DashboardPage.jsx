import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Miniview from '../components/Miniview'; // Adjust the path according to your folder structure
import StatCard from '../components/StatCard'; // Adjust the path according to your folder structure
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardLayout from '../components/DashboardLayout';
import { useSelector } from 'react-redux'


function DashboardPage() {

  const cardList = useSelector((state) => state.cards.cardList) || [] ; // Access the collection from Redux state

  const numberOfCardsCollected = cardList.length;
  // Get the 3 most recently added cards (assuming they are added in chronological order)
  const recentCards = cardList.slice(-3).reverse()

  const totalMarketValue = cardList.reduce((total, card) => {
    const marketPrice = card.tcgplayer?.prices?.holofoil?.market 
    || card.tcgplayer?.prices?.reverseHolofoil?.market 
    || 0; // Use 0 if market price is not available
    return total + marketPrice;
  }, 0);

  return (
    
    <DashboardLayout>
    <Container fluid>
      <Row>
        <Col md={8}>
          <Miniview
            className="p-3"
            title="Recently Added"
            buttonText="See Full Collection"
            recentCards={recentCards}
          />
        </Col>
        <Col md={4}>
          <StatCard
            className="m-3"
            title="Number of cards collected:"
            targetNumber={numberOfCardsCollected}
            duration={4500}
          />
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <Miniview
            className="p-3"
            title="My Collection"
            buttonText="Full Collection"
          />
        </Col>
        <Col md={4}>
          <StatCard
            className="m-3"
            title="Estimated Collection Net Worth:"
            targetNumber={totalMarketValue.toFixed(2)}
            duration={1000}
            isMoney={true} // Enabling money format
          />
        </Col>
      </Row>
    </Container>
    </DashboardLayout>
    
  );
}

export default DashboardPage;


