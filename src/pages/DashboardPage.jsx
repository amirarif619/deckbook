import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Miniview from '../components/Miniview'; // Adjust the path according to your folder structure
import StatCard from '../components/StatCard'; // Adjust the path according to your folder structure
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardLayout from '../components/DashboardLayout';

const numberOfCardsCollected = 50; // Sample data
const estimatedNetWorth = 3454.35; // Sample data

function DashboardPage() {
  return (
    
    <DashboardLayout>
    <Container fluid>
      <Row>
        <Col md={8}>
          <Miniview
            className="p-3"
            title="Wishlist"
            buttonText="See Full List"
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
            targetNumber={estimatedNetWorth}
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


